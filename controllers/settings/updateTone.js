const {tone} = require("../../datamodels/settings");

const updateTone = async (req, res, datamodels) => {

    const newTone = req.body.tone;
    const userId = req.session.user;
    
    if(!userId) {
        return res.status(400).json({ success: false, message: 'Invalid session.' });
    }

    if (typeof newTone !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid tone provided.' });
    }
    
    if(!tone[newTone]) {
        return res.status(400).json({ success: false, message: 'Invalid tone provided.' });
    }

    try {

        const settings = await datamodels.Settings.findOne({
            where: {
                userId
            }
        });
        if(!settings) {
            throw new Error("Settings object not found.");
        }
        await settings.update({ tone: tone[newTone] });
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
module.exports = updateTone;