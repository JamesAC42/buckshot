const { getUserJobs, createJob, getJobInput } = require("../../datamodels/jobs");
const { getUserSettings } = require("../../datamodels/settings");
const { getUser } = require("../../datamodels/user");

const requestCreateJob = async (req, res) => {

    const userId = req.session.user;
    const currentActive = req.body.currentActive;
    if(!userId) {
        return res.status(400).json({ success: false, message: 'Invalid session.' });
    }

    try {

        const user = await getUser(userId);
        const jobs = await getUserJobs(userId); 
        if(!user.premium) {
            if(Object.keys(jobs).length >= 10) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Free tier users can manage up to 10 jobs at once."
                });
            }
        }

        const settings = await getUserSettings(userId);

        let personalInfo = "";
        let requiredSections = [];
        if(settings.copyPersonalInfo === 1 && currentActive) {
            const jobInput = await getJobInput(userId, currentActive);
            if(!jobInput) {
                return res.status(400).json({ success: false, message: "Invalid job provided. "});
            }
            requiredSections = JSON.parse(jobInput.requiredSections);
            personalInfo = jobInput.personalInfo;
        }
        
        const newJob = await createJob(userId, "", personalInfo, requiredSections);

        return res.status(200).json({
            success: true,
            job: newJob
        });

    } catch(err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error occurred." });
    }

}

module.exports = requestCreateJob;