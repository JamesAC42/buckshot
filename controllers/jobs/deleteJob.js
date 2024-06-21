const { validateJob, deleteJob, getUserJobs } = require("../../datamodels/jobs");

const requestDeleteJob = async (req, res) => {

    const job = req.body.job;
    const userId = req.session.user;

    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    if(!job) {
        return res.status(400).json({ success: false, message: "Include job ID to delete." });
    }
    
    try {
        
        const validJob = await validateJob(userId, job);
        if(!validJob) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        const jobs = await getUserJobs(userId);
        if(Object.keys(jobs).length <= 1) {
            return res.status(400).json({ success: false, message: "Cannot delete only job." });
        }

        const result = await deleteJob(userId, job);
        if(result) {
            return res.status(200).json({ success: true });
        } else {
            throw new Error("Error while deleting job");
        }

    } catch(err) {

        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error. "});

    }

}

module.exports = requestDeleteJob;