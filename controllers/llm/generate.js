const models = require("../../llm/models");
const { getUser } = require("../../datamodels/user");
const { getUserSettings, mode } = require("../../datamodels/settings");
const { getJobInput } = require("../../datamodels/jobs");
const generateResume = require("../../llm/generateResume");
const { getUserInputFlags, addUserInputFlag } = require("../../llm/inputFlags");
const checkInputResume = require("../../llm/checkInputResume");

async function prompt(req, res, cache) {

    console.log("beginning prompt...");
    const userId = req.session.user;
    if(!userId) {
        return res.status(400).json({ success: false, message: "Invalid session." });
    }
    
    const {job} = req.body;
    if(!job) {
        return res.status(400).json({ success: false, message: "Invalid schema." });
    }

    try {

        const user = await getUser(userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid user."});
        }

        const flags = await getUserInputFlags(userId, cache);
        if(flags > 5) {
            return res.status(400).json({ success: false, message: "Your account has been flagged for manual review due to too many invalid inputs. You cannot generate any cover letters or resumes until the suspension is lifted. Please contact (buckshotfeedback@gmail.com)[buckshotfeedback@gmail.com] to notify an administrator." });
        }

        if(!user.verified) {
            return res.status(400).json({ success: false, message: "User not verified. "});
        }

        if(user.remainingGenerations <= 0) {
            return res.status(400).json({ success: false, message: "No more generations remaining." });
        }

        const settings = await getUserSettings(userId);
        if(!settings) {
            throw new Error("Couldn't find user settings.");
        }

        const jobInput = await getJobInput(userId, job);
        if(!jobInput) {
            return res.status(400).json({ success: false, message: "Invalid job provided." });
        }
        
        if(settings.mode === mode.RESUME) {

            console.log("adsfasdfad");
            
            let requiredSections = JSON.parse(jobInput.requiredSections);
            if(requiredSections.length === 0) {
                return res.status(400).json({ success: false, message: "Must include at least 1 required section for resumes. "})
            }
            requiredSections = requiredSections.map((s) => s.toLowerCase().replaceAll("_", " "));
            const isValid = await checkInputResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.model);
            console.log("done checking validity");
            if(!isValid.valid) {
                await addUserInputFlag(userId, cache);
                return res.json({ success: false, message: isValid.reason + " \nContinual warnings may result in flagging your account for manual review." });
            }

            console.log("hello");
            
            const resumeResponse = await generateResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.tone, settings.model);
            if(!resumeResponse.success) {
                return res.status(400).json({ success: false, message: resumeResponse.reason });
            }
            
            console.log("world");
            return res.json({ success: true, resume: resumeResponse.resume });

        } else if(settings.mode === mode.COVER) {
            
        } else {
            return res.status(400).json({ success: false, message: "Invalid mode in settings object." });
        }

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

}

module.exports = prompt;