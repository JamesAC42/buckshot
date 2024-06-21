const {mode} = require("../../datamodels/settings");

const updateMode = async (req, res, datamodels) => {

    const newMode = req.body.mode;
    const userId = req.session.user;
    
    if(!userId) {
        return res.status(400).json({ success: false, message: 'Invalid session.' });
    }

    if (typeof newMode !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid tone provided.' });
    }
    
    if(!mode[newMode]) {
        return res.status(400).json({ success: false, message: 'Invalid tone provided.' });
    }

    try {

        const user = await datamodels.User.findOne({
            where: {
                id: userId
            }
        });
        if(!user) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }
        if(!user.premium) {
            return res.status(400).json({ success: false, message: 'Access to premium features denied.' });
        }

        const settings = await datamodels.Settings.findOne({
            where: {
                userId
            }
        });
        if(!settings) {
            throw new Error("Settings object not found.");
        }

        console.log(mode[newMode]);
        await settings.update({ generateMode: mode[newMode] });
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
module.exports = updateMode;