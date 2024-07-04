const promptLoop = require("./promptLoop");
const prompts = require("./prompts/resumePrompts");

const validator = (result) => {
    if(typeof(result) !== 'object') return false;
    if(typeof(result.valid) !== 'boolean') return false;
    if(!result.valid && typeof(result.reason) !== 'string') return false;
    return true;
}

const checkInputResume = async (userInfo, jobInfo, requiredSections, model) => {

    let promptText = 
        prompts.resume_checkInput_prompt
        + prompts.resume_checkInput_qualifications
        + userInfo + "\n"
        + prompts.resume_checkInput_requiredSections
        + requiredSections + "\n"
        + prompts.resume_checkInput_jobInfo
        + jobInfo;

    try {

        console.log(promptText);
        const result = await promptLoop(promptText, model, validator);
        return result;
    
    } catch(err) {
        console.log(err);
        return {
            valid:false,
            reason:"Internal server error. Something went wrong while generating output."
        }
    }
}

module.exports = checkInputResume;