const updateUsername = async (req, res, datamodels) => {

    const { body } = req;
    const { User } = datamodels;

    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }
    
    if (!body.username) {
        return res.status(401).json({ success: false, message: 'Provider a username.' });
    }
    if (typeof body.username !== 'string') {
        return res.status(401).json({ success: false, message: 'Provider a username.' });
    }

    try {
        
        const existingUser = await User.findOne({ where: { username: body.username } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use.' });
        }

        await User.update({ username: body.username }, { where: { id: req.session.user } });

        res.status(200).json({ success: true, message: 'Username successfully updated.' });
        return;

    } catch (err) {
        console.error('Error updating username:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

module.exports = updateUsername;