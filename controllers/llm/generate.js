const { getUser } = require("../../datamodels/user");
const { getUserSettings, mode } = require("../../datamodels/settings");
const { getJobInput, addJobOutput } = require("../../datamodels/jobs");
const generateResume = require("../../llm/generateResume");
const { getUserInputFlags, addUserInputFlag } = require("../../llm/inputFlags");
const checkInputResume = require("../../llm/checkInputResume");

async function prompt(req, res, datamodels, cache) {

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
        if(flags > 20) {
            return res.status(400).json({ success: false, message: "Your account has been flagged for manual review due to too many invalid inputs. You cannot generate any cover letters or resumes until the suspension is lifted. Please contact buckshotfeedback@gmail.com to notify an administrator." });
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

        console.log("test 1");

        console.log(settings.mode, mode.RESUME);
        
        if(settings.mode === mode.RESUME) {

            console.log("adsfasdfad");
            
            let requiredSections = JSON.parse(jobInput.requiredSections);
            if(requiredSections.length === 0) {
                return res.status(400).json({ success: false, message: "Must include at least 1 required section for resumes. "})
            }
            requiredSections = requiredSections.map((s) => s.toLowerCase().replaceAll("_", " "));
            const isValid = await checkInputResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.model);
            console.log("done checking validity");
            console.log(isValid);
            if(!isValid.valid) {
                await addUserInputFlag(userId, cache);
                return res.json({ success: false, message: isValid.reason });
            }

            console.log("hello");
            
            const resumeResponse = await generateResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.tone, settings.model);
            if(!resumeResponse.success) {
                return res.status(400).json({ success: false, message: resumeResponse.reason });
            }
            
            console.log("world");
            console.log(settings);
            const jobOutput = await addJobOutput(job, JSON.stringify(resumeResponse.resume), settings.mode, settings.tone, settings.model);
            
            console.log(jobOutput);
            const userModel = await datamodels.User.findOne({ where: { id: userId } });
            await userModel.update({ remainingGenerations: user.remainingGenerations - 1 });
            
            return res.json({ success: true, jobOutput });

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