const { promptGPT } = require("./prompt");
const prompts = require("./prompts/resumePrompts");

const checkInput = async (userInfo, requiredSections) => {

    let prompt = 
        prompts.resume_checkInput_prompt
        + prompts.resume_checkInput_qualifications
        + userInfo + "\n"
        + prompts.resume_checkInput_requiredSections
        + requiredSections;

    try {
        let response = await promptGPT("gpt-4o", prompt);
        /*
        {
            valid: true | false,
            reason: "Invalid, not enough information provided"
        }
        */
        let result = JSON.parse(response);        
        if(
            typeof(result) !== 'object' || 
            typeof(result.valid) !== 'boolean' || 
            (result.valid === false && typeof(result.reason) !== 'string')) {
            throw new Error("Invalid response format");
        }

        return result;
    
    } catch(err) {
        return {
            valid:false,
            reason:err
        }
    }
}

module.exports = checkInput;