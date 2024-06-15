const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const { secretKey } = require("../../captcha.json");
const { getUserJobs } = require('../../datamodels/jobs');
const { getUserSettings } = require('../../datamodels/settings');
const { sendVerificationEmail } = require('../../lib/sendEmail');
const { setVerificationCode } = require('../../datamodels/cache/verifyEmail');

const createAccount = async (req, res, datamodels, cache) => {

    const { email, username, password, passwordConfirmation, token } = req.body;

    // Validate inputs
    if (!email || !username || !password || !passwordConfirmation || !token) {
        res.status(400).json({ success: false, message: 'All fields are required.' });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        return;
    }

    if (username.length > 20) {
        res.status(400).json({ success: false, message: 'Username cannot exceed 20 characters.' });
        return;
    }

    if (email.length > 100) {
        res.status(400).json({ success: false, message: 'Email cannot exceed 100 characters.' });
        return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
        return;
    }

    if (password !== passwordConfirmation) {
        res.status(400).json({ success: false, message: 'Passwords do not match.' });
        return;
    }

    // Confirm captcha token
    const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${secretKey}&response=${token}`
    }).then(res => res.json());

    if (!captchaResponse.success) {
        res.status(400).json({ success: false, message: 'Captcha verification failed.' });
        return;
    }

    try {

        const existingUserEmail = await datamodels.User.findOne({ where: { email } });
        if (existingUserEmail) {
            res.status(400).json({ success: false, message: 'An account with this email already exists.' });
            return;
        }

        const existingUsername = await datamodels.User.findOne({ where: { username } });
        if (existingUsername) {
            res.status(400).json({ success: false, message: 'An account with this username already exists.' });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create new user
        const user = new datamodels.User({
            id: uuidv4(),
            email,
            username,
            password: hashedPassword,
            dateCreated: new Date(),
            premium: false,
            remainingGenerations: 5,
            verified: false
        });
    
        const savedUser = await user.save();
        const userInfo = {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            dateCreated: savedUser.dateCreated,
            premium: savedUser.premium,
            remainingGenerations: savedUser.remainingGenerations,
            verified: savedUser.verified
        };

        const verifyCode = uuidv4();
        await setVerificationCode(cache, savedUser.id, verifyCode);
        await sendVerificationEmail(savedUser.email, verifyCode);

        const jobs = await getUserJobs(user.id);
        const settings = await getUserSettings(user.id);

        req.session.user = user.id;

        res.json({ 
            success: true, 
            user: userInfo,
            jobs,
            settings
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({ success: false, message: 'An error occurred while creating the account.' });
    }
};

module.exports = createAccount;
