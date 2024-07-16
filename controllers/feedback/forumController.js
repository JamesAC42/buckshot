const {
    createForumRoom,
    getForumRooms,
    deleteForumPost,
    getRoomDetails,
    getRoomPosts,
    addForumPost,
    isUserAdmin,
    isUserMuted
} = require('../../datamodels/feedback.js');
const { getUser } = require('../../datamodels/user.js');

const createRoom = async (req, res, redis) => {
    const { name, initialPost } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    if (!name.trim() || !initialPost.trim()) {
        return res.status(400).json({ success: false, message: 'Room name and initial post are required.' });
    }
    
    if(name.length > 100 || initialPost.length > 500) {
        return res.status(400).json({ success: false, message: 'Values too long.' });
    }
    
    let isMuted = await isUserMuted(req.session.user, redis);
    if(isMuted) {
        return res.status(400).json({ success: false, message: 'You have been muted.' });
    }

    try {
        const room = await createForumRoom(req.session.user, name, initialPost, redis);
        res.status(201).json({ success: true, data: room });
    } catch (err) {
        console.error('Error creating forum room:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getRooms = async (req, res, redis) => {
    try {
        const rooms = await getForumRooms(redis);
        const roomDetails = await Promise.all(rooms.map((room) => {
            return getRoomDetails(room, redis);
        }));
        const roomDetailsWithUsernames = await Promise.all(roomDetails.map(async (room) => {
            const user = await getUser(room.createdBy);
            return {
                ...room,
                username: user.username
            };
        }));
        res.status(200).json({ success: true, data: roomDetailsWithUsernames });
    } catch (err) {
        console.error('Error fetching forum rooms:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getPosts = async (req, res, redis) => {
    const { roomId } = req.params;

    try {
        const posts = await getRoomPosts(roomId, redis);
        const updatedPosts = await Promise.all(posts.map(async (post) => {
            const user = await getUser(post.userId);
            return {
                ...post,
                username: user.username
            };
        }));
        res.status(200).json({ success: true, data: updatedPosts });
    } catch (err) {
        console.error('Error fetching room posts:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const addPost = async (req, res, redis) => {

    const { roomId } = req.params;
    const { comment } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }

    if (!comment) {
        return res.status(400).json({ success: false, message: 'Comment is required.' });
    }
    
    if(comment.length > 500) {
        return res.status(400).json({ success: false, message: 'Comment too long.' });
    }
    
    let isMuted = await isUserMuted(req.session.user, redis);
    if(isMuted) {
        return res.status(400).json({ success: false, message: 'You have been muted.' });
    }

    try {

        const post = await addForumPost(req.session.user, "buckshot:room:" + roomId, comment, redis);
        post.username = (await getUser(post.userId)).username;
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        console.error('Error adding forum post:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deletePost = async (req, res, redis) => {
    const { roomId, postId } = req.params;

    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'User not logged in.' });
    }
    
    let isAdmin = await isUserAdmin(req.session.user);
    if(!isAdmin) {
        return res.status(400).json({ success: false, message: 'Invalid permission.' });
    }

    try {
        await deleteForumPost(roomId, parseInt(postId), redis);
        res.status(200).json({ success: true, message: 'Post deleted successfully.' });
    } catch (err) {
        console.error('Error deleting forum post:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createRoom,
    getRooms,
    getPosts,
    addPost,
    deletePost
};