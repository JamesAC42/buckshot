const {
    getChat,
    addChat,
    isUserMuted
} = require('../../datamodels/feedback.js');
const { getUser } = require('../../datamodels/user.js');

const getChatMessages = async (req, res, redis) => {
    try {
        const messages = await getChat(redis);
        const updatedMessages = await Promise.all(messages.map(async (message) => {
            const user = await getUser(message.userId);
            return {
                ...message,
                username: user.username
            };
        }));

        res.status(200).json({ success: true, data: updatedMessages });
    } catch (err) {
        console.error('Error fetching chat messages:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const addChatMessage = async (req, res, redis, io) => {
    const { message } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required.' });
    }
    
    let isMuted = await isUserMuted(req.session.user, redis);
    if(isMuted) {
        return res.status(400).json({ success: false, message: 'You are muted.' });
    }

    try {
        const newMessage = {
            userId: req.session.user,
            message,
            timestamp: new Date()
        };
        await addChat(newMessage, redis);
        newMessage.username = (await getUser(newMessage.userId)).username;

        io.emit('newChatMessage', newMessage);

        res.status(201).json({ success: true, data: newMessage });
    } catch (err) {
        console.error('Error adding chat message:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getChatMessages,
    addChatMessage
};