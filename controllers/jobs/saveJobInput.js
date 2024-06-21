const { validateJob, setJobTitle, setJobPersonalInfo, setJobRequiredSections, setJobJobInfo } = require("../../datamodels/jobs");
const { sections } =  require("../../datamodels/settings");

const requestSaveJobInput = async (req, res) => {

    let {
        job,
        title,
        personalInfo,
        jobInfo,
        requiredSections
    } = req.body;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }

    if (typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({ success: false, message: "Title must be a string and less than 100 characters." });
    }

    if (typeof personalInfo !== 'string' || typeof jobInfo !== 'string') {
        return res.status(400).json({ success: false, message: "Personal info and job info must be strings." });
    }

    if (personalInfo.length > 5000 || jobInfo.length > 5000) {
        return res.status(400).json({ success: false, message: "Personal info and job info must not exceed 5000 characters." });
    }

    if (!Array.isArray(requiredSections) || !requiredSections.every(section => typeof section === 'string' && Object.values(sections).includes(section))) {
        return res.status(400).json({ success: false, message: "Required sections must be an array of strings that exist in the sections object." });
    }
    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        await setJobTitle(job, title);
        await setJobPersonalInfo(job, personalInfo);
        await setJobJobInfo(job, jobInfo);
        await setJobRequiredSections(job, requiredSections);

        return res.status(200).json({ success: true });

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }

}

const requestSaveJobTitle = async (req, res) => {

    let {
        job,
        title
    } = req.body;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }

    if (typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({ success: false, message: "Title must be a string and less than 100 characters." });
    }
    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        await setJobTitle(job, title);

        return res.status(200).json({ success: true });

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }
}

const requestSaveJobPersonalInfo = async (req, res) => {
    let {
        job,
        personalInfo
    } = req.body;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }

    if (typeof personalInfo !== 'string') {
        return res.status(400).json({ success: false, message: "Personal info and job info must be strings." });
    }

    if (personalInfo.length > 5000) {
        return res.status(400).json({ success: false, message: "Personal info and job info must not exceed 5000 characters." });
    }

    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        await setJobPersonalInfo(job, personalInfo);
        return res.status(200).json({ success: true });

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }

}

const requestSaveJobJobInfo = async (req, res) => {

    let {
        job,
        jobInfo
    } = req.body;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }

    if (typeof jobInfo !== 'string') {
        return res.status(400).json({ success: false, message: "Personal info and job info must be strings." });
    }

    if (jobInfo.length > 5000) {
        return res.status(400).json({ success: false, message: "Personal info and job info must not exceed 5000 characters." });
    }
    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }

        await setJobJobInfo(job, jobInfo);
        return res.status(200).json({ success: true });

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }
}

const requestSaveJobRequiredSections = async (req, res) => {

    let {
        job,
        requiredSections
    } = req.body;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }

    if (!Array.isArray(requiredSections) || !requiredSections.every(section => typeof section === 'string' && Object.values(sections).includes(section))) {
        return res.status(400).json({ success: false, message: "Required sections must be an array of strings that exist in the sections object." });
    }
    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        await setJobRequiredSections(job, requiredSections);
        return res.status(200).json({ success: true });

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }
}

module.exports = {
    requestSaveJobInput,
    requestSaveJobTitle,
    requestSaveJobPersonalInfo,
    requestSaveJobJobInfo,
    requestSaveJobRequiredSections
};