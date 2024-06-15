const { v4: uuidv4 } = require('uuid');
const { setPasswordResetCode, alreadyHasPasswordResetCode } = require('../../datamodels/cache/verifyEmail');
const { sendForgotPasswordEmail } = require('../../lib/sendEmail');

const sendResetPasswordEmail = async (req, res, datamodels, cache) => {

    try {
        const { email } = req.body;
        const user = await datamodels.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ success: false, message: 'No account with this email exists.' });
            return;
        }

        const hasCode = await alreadyHasPasswordResetCode(cache, user.id);
        if(hasCode) {
            res.status(400).json({ success: false, message: "A password reset request has already been sent for this account."});
            return;
        }

        const passwordCode = uuidv4();

        await setPasswordResetCode(cache, user.id, passwordCode);
        await sendForgotPasswordEmail(email, passwordCode);

        res.json({success:true});

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while checking the user.' });
    }

}

module.exports = sendResetPasswordEmail;