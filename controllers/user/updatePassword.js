const bcrypt = require('bcrypt');
const updatePassword = async (req, res, datamodels) => {

    const {password} = req.body;

    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    // Validate inputs
    if (!password) {
        res.status(400).json({ success: false, message: 'All fields are required.' });
        return;
    }
    if (typeof password !== 'string') {
        return res.status(401).json({ success: false, message: 'Provider a username.' });
    }

    if (password.length < 6) {
        res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {

        const user = await datamodels.User.findOne({ id: req.session.user });
        if (!user) {
            res.json({ success: false, message: 'User not found.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.json({ success: false, message: 'Incorrect password.' });
            return;
        }
        
        await user.update({ password: hashedPassword}, { where: { id: req.session.user } });
        res.status(200).json({ success: true, message: 'Password successfully updated.' });
        return;

    } catch (err) {
        console.error('Error updating email:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    

}

module.exports = updatePassword;