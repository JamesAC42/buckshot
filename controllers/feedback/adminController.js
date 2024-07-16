
const {
    muteUser,
    unmuteUser,
    isUserAdmin,
    isUserMuted
} = require('../../datamodels/feedback.js');

const muteUserController = async (req, res) => {
    const { userId } = req.params;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    try {
        const isAdmin = await isUserAdmin(req.session.user);
        if (!isAdmin) {
            return res.status(403).json({ success: false, message: 'User does not have admin privileges.' });
        }

        await muteUser(userId);
        res.status(200).json({ success: true, message: 'User muted successfully.' });
    } catch (err) {
        console.error('Error muting user:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const unmuteUserController = async (req, res) => {
    const { userId } = req.params;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    try {
        const isAdmin = await isUserAdmin(req.session.user);
        if (!isAdmin) {
            return res.status(403).json({ success: false, message: 'User does not have admin privileges.' });
        }

        await unmuteUser(userId);
        res.status(200).json({ success: true, message: 'User unmuted successfully.' });
    } catch (err) {
        console.error('Error unmuting user:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const checkUserStatus = async (req, res) => {
    const { userId } = req.params;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    try {
        const isMuted = await isUserMuted(userId);
        const isAdmin = await isUserAdmin(userId);
        res.status(200).json({ success: true, data: { isMuted, isAdmin } });
    } catch (err) {
        console.error('Error checking user status:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    muteUserController,
    unmuteUserController,
    checkUserStatus
};