const bcrypt = require('bcrypt');
const { getUser } = require('../../datamodels/user');
const { getUserJobs } = require('../../datamodels/jobs');
const { getUserSettings } = require('../../datamodels/settings');
const login = async (req, res, datamodels) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required.' });
        return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
        return;
    }

    try {
        const user = await datamodels.User.findOne({ email: email });

        if (!user) {
            res.json({ success: false, message: 'User not found.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.json({ success: false, message: 'Incorrect password.' });
            return;
        }

        const userInfo = await getUser(user.id);
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

        res.status(500).json({ success: false, message: 'An error occurred while logging in.' });
    }
}

module.exports = login;