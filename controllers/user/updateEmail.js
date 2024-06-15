const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail } = require('../../lib/sendEmail');
const { setVerificationCode } = require('../../datamodels/cache/verifyEmail');

const updateEmail = async (req, res, datamodels, cache) => {

    const { body } = req;
    const { User } = datamodels;

    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    // Validate email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(body.email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    try {
        
        const existingUser = await User.findOne({ where: { email: body.email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use.' });
        }

        const user = await datamodels.User.findOne({ id: req.session.user });
        await user.update({ email: body.email, verified: false });

        const verifyCode = uuidv4();
        await setVerificationCode(cache, user.id, verifyCode);
        await sendVerificationEmail(user.email, verifyCode);

        res.status(200).json({ success: true, message: 'Email updated and verification email sent.' });
        return;

    } catch (err) {
        console.error('Error updating email:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

module.exports = updateEmail;