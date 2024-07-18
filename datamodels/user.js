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

const addMonthlyGenerations = async (userid) => {
    try {
        const user = await datamodels.User.findOne({ where: { id: userid } });
        if (user) {
            user.remainingGenerations += 15;
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error adding generations to user:', error);
        return false;
    }
}

const removePremium = async (userid) => {

    try {
        const user = await datamodels.User.findOne({ where: { id: userid } });
        if (user) {
            user.premium = false;
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error adding generations to user:', error);
        return false;
    }

}

const makePremium = async (userid) => {
    try {
        const user = await datamodels.User.findOne({ where: { id: userid } });
        if (user) {
            user.premium = true;
            user.remainingGenerations += 15;
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error making user premium:', error);
        return false;
    }
}

const addCredits = async (userid, amount) => {

    try {
        const user = await datamodels.User.findOne({ where: { id: userid } });
        if (user) {
            user.remainingGenerations += amount
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error making user premium:', error);
        return false;
    }
}

module.exports = {
    getUser,
    addMonthlyGenerations,
    removePremium,
    makePremium,
    addCredits
};