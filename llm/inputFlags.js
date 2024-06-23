const CacheKeys = require("../CacheKeys")

const getUserInputFlags = (userid, redisClient) => {

    return new Promise((resolve, reject) => {

        redisClient.get(CacheKeys.InvalidInputFlags + userid, (err, result) => {
            if(err) {
                console.error(err);
                reject();
                return;
            }
            if(!result) {
                resolve(0);
                return;
            }
            resolve(parseInt(result));
        })

    })

}

const addUserInputFlag = (userid, redisClient) => {
    return new Promise((resolve, reject) => {
        redisClient.incr(CacheKeys.InvalidInputFlags + userid, (err, newValue) => {
            if (err) {
                console.error('Error incrementing invalid input flag:', err);
                reject(err);
            } else {
                resolve(newValue);
            }
        });
    });
}

const setUserInputFlag = (userid, value, redisClient) => {
    return new Promise((resolve, reject) => {
        redisClient.set(CacheKeys.InvalidInputFlags + userid, value, (err, result) => {
            if (err) {
                console.error('Error setting invalid input flag:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getUserInputFlags,
    addUserInputFlag,
    setUserInputFlag
}