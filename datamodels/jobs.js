const datamodels = require('../datamodels/datamodels');

const getUserJobs = async (userid) => {
    try {

        const jobInputs = await datamodels.JobInput.findAll({ where: { userId: userid } });
        const jobs = {};

        for (const jobInput of jobInputs) {
            jobs[jobInput.id] = jobInput;
        }
        return jobs;
    
    } catch (err) {
        console.error('Error fetching user jobs:', err);
        throw err;
    }
};

const createJob = async (userid, title) => {

    const newJob = {
        userId: userid,
        title: title,
        personal_info: '',
        job_info: '',
        required_sections: JSON.stringify([
            datamodels.sections.EDUCATION,
            datamodels.sections.WORK_HISTORY,
            datamodels.sections.SUMMARY,
            datamodels.sections.SKILLS,
            datamodels.sections.PROJECTS,
            datamodels.sections.ACADEMIC_ACHIEVEMENTS,
            datamodels.sections.VOLUNTEERING
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
    const userJob = await datamodels.JobInput.findOne({ where: { id: job, userId: userid } });
    return !!userJob;
}

const deleteJob = async (userid, job) => {
    const userJob = await datamodels.JobInput.findOne({ where: { id: job, userId: userid } });
    if (userJob) {
        await datamodels.JobInput.destroy({ where: { id: job } });
        return true;
    }
    return false;
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