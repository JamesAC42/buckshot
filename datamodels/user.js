const datamodels = require('../datamodels/datamodels');

const getUser = async (userid) => {

    const user = await datamodels.User.findOne({ where: {id: userid }});
    if(user) {
        return {
            id: user.id,
            username: user.username,
            dateCreated: user.dateCreated,
            premium: user.premium,
            remainingGenerations: user.remainingGenerations,
            email: user.email,
            verified: user.verified
        }
    } else {
        return null;
    }

}

module.exports = {
    getUser
};