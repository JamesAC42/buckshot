const datamodels = require('../datamodels/datamodels');
const { sections } = require('../datamodels/settings');
const sequelize = require("../database.js");



// -------------------- TESTIMONIALS ------------------------------------------------------------------
// -------------------- TESTIMONIALS ------------------------------------------------------------------
// -------------------- TESTIMONIALS ------------------------------------------------------------------

const getTestimonials = async () => {
    const testimonials = await datamodels.Testimonials.findAll();
    return testimonials;
}

const addTestimonial = async (userid, name, comment) => {
    const newTestimonial = await datamodels.Testimonials.create({
        userId: userid,
        name: name,
        comment: comment,
        dateCreated: new Date()
    });
    return newTestimonial;
}

const testimonialExists = async (userid) => {
    const existingTestimonial = await datamodels.Testimonials.findOne({ where: { userId: userid } });
    return existingTestimonial !== null;
}

const deleteTestimonial = async (id) => {
    const result = await datamodels.Testimonials.destroy({ where: { id: id } });
    return result;
}

// -------------------- FORUM -----------------------------------------------------------------------
// -------------------- FORUM -----------------------------------------------------------------------
// -------------------- FORUM -----------------------------------------------------------------------

const MAX_ROOMS = 4;
const FORUM_ROOMS_KEY = 'buckshot:forum:rooms';

const createForumRoom = async (userid, name, initialPost, redis) => {
    const score = Date.now();
    const roomId = `buckshot:room:${score}`;

    // Create room in sorted set
    await redis.zadd(FORUM_ROOMS_KEY, score, roomId);

    // Set room details

    let roomDetails = {
        name,
        createdBy: userid,
        createdAt: score,
        lastReply: initialPost
    };
    await redis.hmset(`${roomId}:details`, roomDetails);

    // Add initial post
    await addForumPost(userid, roomId, initialPost, redis);

    // Trim rooms if exceeding MAX_ROOMS
    const roomCount = await new Promise((resolve, reject) => {
        redis.zcard(FORUM_ROOMS_KEY, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
    if (roomCount > MAX_ROOMS) {
        const oldestRoom = await new Promise((resolve, reject) => {
            redis.zrange(FORUM_ROOMS_KEY, 0, 0, "WITHSCORES", (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
        if (oldestRoom.length > 0) {
            await deleteForumRoom(oldestRoom[0], redis);
        }
    }

    return roomDetails;
}

const addForumPost = async (userid, roomId, comment, redis) => {

    // Ensure that the roomId is already a key in the FORUM_ROOMS_KEY sorted set
    const roomExists = await redis.zscore(FORUM_ROOMS_KEY, roomId);
    if (!roomExists) {
        throw new Error(`Room with ID ${roomId} does not exist.`);
    }

    const postId = Date.now();
    const postData = {
        id: postId,
        userId: userid,
        comment,
        createdAt: postId
    };
    const post = JSON.stringify(postData);

    // Add post to room's post list
    await redis.rpush(`${roomId}:posts`, post);

    // Update room's last activity time
    await redis.zadd(FORUM_ROOMS_KEY, Date.now(), roomId);
    await redis.hmset(`${roomId}:details`, {
        lastReply: comment
    });

    return postData;
}

const deleteForumRoom = async (roomId, redis) => {
    // Remove room from sorted set
    await redis.zrem(FORUM_ROOMS_KEY, roomId);

    // Delete room details
    await redis.del(`${roomId}:details`);

    // Delete room posts
    await redis.del(`${roomId}:posts`);
}

const deleteForumPost = async (roomId, postId, redis) => {
    const posts = await redis.lrange(`buckshot:room:${roomId}:posts`, 0, -1);
    const updatedPosts = posts.filter(post => {
        const parsedPost = JSON.parse(post);
        return parsedPost.id !== postId;
    });

    // Replace posts list with updated list
    await redis.del(`buckshot:room:${roomId}:posts`);
    if (updatedPosts.length > 0) {
        await redis.rpush(`buckshot:room:${roomId}:posts`, ...updatedPosts);
    }
}

// Additional helper functions

const getForumRooms = async (redis) => {
    return new Promise((resolve, reject) => {
        redis.zrevrange(FORUM_ROOMS_KEY, 0, -1, (err, result) => {
            if(err) {
                reject(err);
            } else {
                if(!result) {
                    resolve([]);
                    return;
                }
                resolve(result);
            }
        })
    })
}

const getRoomDetails = async (roomId, redis) => {
    return new Promise((resolve, reject) => {
        redis.hgetall(`${roomId}:details`, (err, result) => {
            if(err || !result) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}

const getRoomPosts = async (roomId, redis, start = 0, end = -1) => {
    return new Promise((resolve, reject) => {
        redis.lrange(`buckshot:room:${roomId}:posts`, start, end, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            if(!result) {
                resolve([]);
            } else {
                resolve(result.map(JSON.parse));
            }
        });
    })
}


// -------------------- CHAT -----------------------------------------------------------------------
// -------------------- CHAT -----------------------------------------------------------------------
// -------------------- CHAT -----------------------------------------------------------------------

const CHAT_KEY = 'buckshot:chat:messages';

const getChat = async (redis) => {
    const messages = await new Promise((resolve, reject) => {
        redis.lrange(CHAT_KEY, 0, -1, (err, result) => {
            if(err) {
                reject(err);
            } else {
                if(!result) {
                    resolve([]);
                } else {
                    resolve(result);
                }
            }
        });
    }) 
    return messages.map(JSON.parse);
}

const addChat = async (message, redis) => {
    const messageString = JSON.stringify(message);
    await redis.lpush(CHAT_KEY, messageString);
    await redis.ltrim(CHAT_KEY, 0, 99); // Keep only the last 100 messages
}

// ------------------- ADMIN -----------------------------------------------------------------------

const MUTE_SET_KEY = 'buckshot:mutedUsers';

const muteUser = async (userId, redis) => {
    await redis.sadd(MUTE_SET_KEY, userId);
}

const unmuteUser = async (userId, redis) => {
    await redis.srem(MUTE_SET_KEY, userId);
}

const isUserMuted = async (userId, redis) => {
    const isMuted = await redis.sismember(MUTE_SET_KEY, userId);
    return isMuted === 1;
}

const ADMIN_SET_KEY = 'buckshot:adminUsers';

const isUserAdmin = async (userId, redis) => {
    const isAdmin = await redis.sismember(ADMIN_SET_KEY, userId);
    return isAdmin === 1;
}

module.exports = {
    getTestimonials,
    addTestimonial,
    testimonialExists,
    deleteTestimonial,
    createForumRoom,
    getForumRooms,
    addForumPost,
    deleteForumPost,
    getRoomDetails,
    getRoomPosts,
    getChat,
    addChat,
    muteUser,
    unmuteUser,
    isUserMuted,
    isUserAdmin
};