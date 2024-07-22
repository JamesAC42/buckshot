const { getUser } = require("../../datamodels/user");
const { getUserSettings, mode } = require("../../datamodels/settings");
const { getJobInput, addJobOutput } = require("../../datamodels/jobs");
const generateResume = require("../../llm/generateResume");
const { getUserInputFlags, addUserInputFlag } = require("../../llm/inputFlags");
const checkInputResume = require("../../llm/checkInputResume");
const checkInputCoverLetter = require("../../llm/checkInputCoverLetter");
const generateCoverLetter = require("../../llm/generateCoverLetter");

async function prompt(req, res, datamodels, cache) {

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

        let generationResponse;
        let generationContent;
        
        if(settings.mode === mode.RESUME) {
            
            let requiredSections = JSON.parse(jobInput.requiredSections);
            if(requiredSections.length === 0) {
                return res.status(400).json({ success: false, message: "Must include at least 1 required section for resumes. "})
            }
            requiredSections = requiredSections.map((s) => s.toLowerCase().replaceAll("_", " ")).join("\n") + "\n";
            const isValid = await checkInputResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.model);
            if(!isValid.valid) {
                await addUserInputFlag(userId, cache);
                return res.json({ success: false, message: isValid.reason });
            }
            
            generationResponse = await generateResume(jobInput.personalInfo, jobInput.jobInfo, requiredSections, settings.tone, settings.model);

        } else if(settings.mode === mode.COVER) {
            
            const isValid = await checkInputCoverLetter(jobInput.personalInfo, jobInput.jobInfo, settings.model);
            if(!isValid.valid) {
                await addUserInputFlag(userId, cache);
                return res.json({ success: false, message: isValid.reason });
            }

            generationResponse = await generateCoverLetter(jobInput.personalInfo, jobInput.jobInfo, settings.tone, settings.model);

        } else {
            return res.status(400).json({ success: false, message: "Invalid mode in settings object." });
        }
        
        if(!generationResponse || !generationResponse.success) {
            return res.status(400).json({ success: false, message: generationResponse.reason });
        }

        // Increment the successful generations count for the user
        const redisKey = `buckshot:userGenerations`;
        try {
            await cache.hincrby(redisKey, userId, 1);
        } catch (error) {
            console.error('Error incrementing successful generations count:', error);
        }

        if(settings.mode === mode.RESUME) {
            generationContent = generationResponse.resume;
        } else {
            generationContent = generationResponse.letter;
        }

        let generationKeys = Object.keys(generationContent);
        for(let k = 0; k < generationKeys.length; k++) {
            let genVal = generationContent[generationKeys[k]];
            if(
                (typeof genVal === "object" && Object.keys(genVal).length === 0) ||
                (typeof genVal === "string" && genVal.trim().length === 0) ||
                (Array.isArray(genVal) && genVal.length === 0)
            ) {
                delete generationContent[generationKeys[k]];
            }
        }

        const jobOutput = await addJobOutput(job, JSON.stringify(generationContent), settings.mode, settings.tone, settings.model);
        
        const userModel = await datamodels.User.findOne({ where: { id: userId } });
        await userModel.update({ remainingGenerations: user.remainingGenerations - 1 });
        
        return res.json({ success: true, jobOutput });

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

}

module.exports = prompt;