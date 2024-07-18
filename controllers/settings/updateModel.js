const models = require("../../llm/models");

const updateModel = async (req, res, datamodels) => {

    const newModel = req.body.model;
    const userId = req.session.user;
    
    return res.status(400).json({ success: false, message: "You cannot change the model at this time."});

    if(!userId) {
        return res.status(400).json({ success: false, message: 'Invalid session.' });
    }

    if (typeof newModel !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid model provided.' });
    }
    
    if(!models[newModel]) {
        return res.status(400).json({ success: false, message: 'Invalid model provided.' });
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
        await settings.update({ model: models[newModel] });
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
module.exports = updateModel;