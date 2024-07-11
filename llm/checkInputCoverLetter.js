const promptLoop = require("./promptLoop");
const prompts = require("./prompts/resumePrompts");

const validator = (result) => {
    if(typeof(result) !== 'object') return false;
    if(typeof(result.valid) !== 'boolean') return false;
    if(!result.valid && typeof(result.reason) !== 'string') return false;
    return true;
}

const checkInputCoverLetter = async (userInfo, jobInfo, model) => {

    let promptText = prompts.coverLetter_checkInput_prompt
        + prompts.coverLetter_checkInput_qualifications + "\n"
        + userInfo + "\n"
        + prompts.coverLetter_checkInput_jobInfo + "\n"
        + jobInfo;

    try {

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

module.exports = checkInputCoverLetter;