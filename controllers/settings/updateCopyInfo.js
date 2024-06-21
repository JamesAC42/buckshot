const updateCopyInfo = async (req, res, datamodels) => {

    const copyPersonalInfo = req.body.copyPersonalInfo;
    const userId = req.session.user;
    
    if(!userId) {
        return res.status(400).json({ success: false, message: 'Invalid session.' });
    }

    if (typeof copyPersonalInfo !== 'boolean') {
        return res.status(400).json({ success: false, message: 'Invalid input for copyPersonalInfo, must be a boolean value.' });
    }

    try {

        const settings = await datamodels.Settings.findOne({
            where: {
                userId
            }
        });
        if(!settings) {
            throw new Error("Settings object not found");
        }
        await settings.update({copyPersonalInfo});
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = updateCopyInfo;