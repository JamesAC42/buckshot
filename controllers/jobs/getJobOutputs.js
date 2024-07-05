const { getJobOutputs, validateJob } = require("../../datamodels/jobs");
const { getUser } = require("../../datamodels/user");

const getJobOutputsAPI = async (req, res) => {

    const job = req.query.job;
    if (typeof job !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(job)) {
        return res.status(400).json({ success: false, message: "Invalid job ID format." });
    }

    if(!req.session.user) {
        res.json({success:false});
    } else {
        try {
            
            let user = await getUser(req.session.user);
            let ownsJob = await validateJob(user.id, job);
            if(!ownsJob) {
                return res.status(400).json({ success: false, message: "You do not own this job. "});
            }

            const outputs = await getJobOutputs(job);
            return res.status(200).json({ 
                success: true, 
                outputs,
                job
            }); 

        } catch(err) {

            console.error(err);
            req.status(500).json({success: false, message: "Internal server error"});

        }
    }

}

module.exports = getJobOutputsAPI;