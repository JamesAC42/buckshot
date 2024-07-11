const { verifyEmailCode } = require("../../datamodels/cache/verifyEmail");

const verifyEmail = async (req, res, datamodels, cache) => {
    try {
        const { code } = req.body;
        const { user } = req.session;

        if (!user) {
            res.status(401).json({ success: false, message: 'User is not logged in.' });
            return;
        }

        const validCode = await verifyEmailCode(cache, user, code);
        if (!validCode) {
            res.json({ success: false, message: 'Verification code does not match.' });
            return;
        }

        const updatedUser = await datamodels.User.update({ verified: true }, { where: { id: user } });
        if (!updatedUser) {
            res.status(500).json({ success: false, message: 'Failed to update user verification status.' });
            return;
        }

        res.json({ success: true, message: 'Email verification successful.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred during email verification.' });
    }
}
module.exports = verifyEmail;