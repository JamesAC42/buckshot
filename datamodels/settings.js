const datamodels = require('../datamodels/datamodels');
const models = require('../llm/models');

const tone = {
    STANDARD: 1,
    CURT: 2,
    HAMMY: 3,
    1: "STANDARD",
    2: "CURT",
    3: "HAMMY"
};

const mode = {
    RESUME: 1,
    COVER: 2,
    1: "RESUME",
    2: "COVER"
}

const sections = {
    EDUCATION: "EDUCATION",
    WORK_HISTORY: "WORK_HISTORY",
    OBJECTIVE: "OBJECTIVE",
    SUMMARY: "SUMMARY",
    SKILLS: "SKILLS",
    VOLUNTEERING: "VOLUNTEERING",
    CERTIFICATIONS: "CERTIFICATIONS",
    AWARDS: "AWARDS",
    ACADEMIC_ACHIEVEMENTS: "ACADEMIC_ACHIEVEMENTS",
    REFERENCES: "REFERENCES",
    HOBBIES: "HOBBIES",
    PROJECTS: "PROJECTS",
    WEBSITES: "WEBSITES",
    CONTACT_INFO: "CONTACT_INFO",
    OTHER_STUFF: "OTHER_STUFF"
}

const getUserSettings = async (userid) => {
    try {
        let settings = await datamodels.Settings.findOne({ where: { userId: userid } });
        if (!settings) {
            settings = await datamodels.Settings.create({
                userId: userid,
                tone: tone.HAMMY, // Default tone
                copyPersonalInfo: true, // Default value
                model: models.CLAUDE35_SONNET, // Default mode
                generateMode: mode.RESUME // Default generate mode
            });
        }

        const settings_object = {
            tone: settings.tone,
            copyPersonalInfo: settings.copyPersonalInfo ? 1 : 2,
            model: settings.model,
            mode: settings.generateMode
        }

        return settings_object;
    } catch (error) {
        console.error('Error getting user settings:', error);
        throw error;
    }
}

const saveUserSettings = async (userid, settings) => {
    try {
        const user = await datamodels.User.findOne({ where: { id: userid } });
        if (!user) {
            throw new Error('Invalid user');
        }
        let userSettings = await datamodels.Settings.findOne({ where: { userId: userid } });
        if (!userSettings) {
            userSettings = await datamodels.Settings.create({
                userId: userid,
                ...settings
            });
        } else {
            userSettings = await userSettings.update(settings);
        }
        return userSettings;
    } catch (error) {
        console.error('Error saving user settings:', error);
        throw error;
    }
}

module.exports = {
    tone, mode, sections,
    getUserSettings,
    saveUserSettings
};