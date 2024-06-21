const datamodels = require('../datamodels/datamodels');
const { sections } = require('../datamodels/settings');
const sequelize = require("../database.js");
const { v4: uuidv4 } = require('uuid');

const getUserJobs = async (userid) => {
    try {

        const jobInputs = await datamodels.JobInput.findAll({ where: { userId: userid } });
        const jobs = {};

        for (const jobInput of jobInputs) {
            jobs[jobInput.id] = jobInput;
            jobs[jobInput.id].outputs = null;
        }
        return jobs;
    
    } catch (err) {
        console.error('Error fetching user jobs:', err);
        throw err;
    }
};

const createJob = async (userid, title) => {

    const newJob = {
        id: uuidv4(),
        userId: userid,
        title: title,
        personalInfo: '',
        jobInfo: '',
        requiredSections: JSON.stringify([
            sections.EDUCATION,
            sections.WORK_HISTORY,
            sections.SUMMARY,
            sections.SKILLS,
            sections.PROJECTS,
            sections.ACADEMIC_ACHIEVEMENTS,
            sections.VOLUNTEERING
        ])
    };

    try {
        const job = datamodels.JobInput.create(newJob);
        return job;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

// returns bool based on whether userid is owner of job
const validateJob = async (userid, job) => {

    console.log(userid, job);
    const userJob = await datamodels.JobInput.findOne({ where: { id: job, userId: userid } });
    console.log(userJob);
    return !!userJob;
}

const deleteJob = async (userid, job) => {
    try {
        const userJob = await datamodels.JobInput.findOne({ where: { id: job, userId: userid } });
        if (userJob) {
            
            await sequelize.transaction(async (t) => {
                await datamodels.JobOutput.destroy({ where: { job: job } }, { transaction: t });
                await datamodels.JobInput.destroy({ where: { id: job } }, { transaction: t });
            });
    
            return true;
        }
        return false;
    } catch(err) {
        console.error(err);
        return false;
    }
}

const setJobTitle = async (job, title) => {
    const updatedJob = await datamodels.JobInput.update({ title: title }, { where: { id: job } });
    return updatedJob;
}

const setJobPersonalInfo = async (job, personalInfo) => {
    const updatedJob = await datamodels.JobInput.update({ personalInfo: personalInfo }, { where: { id: job } });
    return updatedJob;
}

const setJobJobInfo = async (job, jobInfo) => {
    const updatedJob = await datamodels.JobInput.update({ jobInfo: jobInfo }, { where: { id: job } });
    return updatedJob;
}

const setJobRequiredSections = async (job, requiredSections) => {
    const updatedJob = await datamodels.JobInput.update({ requiredSections: JSON.stringify(requiredSections) }, { where: { id: job } });
    return updatedJob;
}

const addJobOutput = async (job, outputText) => {
    const newOutput = await datamodels.JobOutput.create({ job: job, output: outputText });
    return newOutput;
}

module.exports = {
    getUserJobs,
    createJob,
    deleteJob,
    validateJob,
    setJobTitle,
    setJobPersonalInfo,
    setJobJobInfo,
    setJobRequiredSections,
    addJobOutput
};