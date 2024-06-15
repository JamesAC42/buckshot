const bcrypt = require('bcrypt');
const { checkPasswordResetCode } = require('../../datamodels/cache/verifyEmail');

const resetPassword = async (req, res, datamodels, cache) => {
    const { email, password, code } = req.body;

    // Validate all fields
    if (!email || !password || !code) {
        return res.status(400).json({ success:false, message: 'Email, password, and code are required.' });
    }

    // Validate email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success:false, message: 'Invalid email format.' });
    }

    // Validate password length
    if (password.length < 3) {
        return res.status(400).json({ success:false, message: 'Password must be at least 3 characters long.' });
    }

    try {
        // Check if user exists for the email
        const user = await datamodels.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success:false, message: 'User not found.' });
        }
        
        const checkResetCode = await checkPasswordResetCode(cache, user.id, code);
        if(!checkResetCode) {
            return res.status(404).json({ success:false, message: "Invalid password reset code." });
        }

        // Update the user's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Send success response
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Error resetting password:', error);
        let errorMessage;
        if(error === "User has not requested a password reset.") {
            errorMessage = error;
        } else {
            errorMessage = 'Internal Server Error';
        }
        return res.status(500).json({ success:false, message:  errorMessage });
    }
}

module.exports = resetPassword;