const { sections, tone } = require("../datamodels/settings");
const promptLoop = require("./promptLoop");
const prompts = require("./prompts/resumePrompts");

const validator = (result) => {
    console.log("validating result...");
    if(typeof(result) !== 'object') return false;
    console.log("1");
    if(typeof(result.success) !== 'boolean') return false;
    console.log("2");
    if(!result.success && typeof(result.reason) !== 'string') return false;
    console.log("3");
    if(result.success) {
        console.log("4");
        if(typeof(result.resume) !== 'object') return false;
        console.log("5");
        for(let section of Object.keys(result.resume)) {
            console.log(section);
            let key = section.toUpperCase().replace(" ","_");
            console.log(key);
            if(!sections[key]) return false;
            console.log("6");
            if(typeof(result.resume[section]) !== 'string') return false;
            console.log("7");
        }
    }
    console.log("8");
    return true;
}

const generateResume = async (qualifications, jobInfo, requiredSections, userTone, model) => {

    let promptText = 
        prompts.resume_generateResume_prompt
        + prompts.resume_generateResume_qualifications
        + qualifications + "\n"
        + prompts.resume_generateResume_jobInformation
        + jobInfo + "\n"
        + prompts.resume_generateResume_requiredSections
        + requiredSections + "\n";

    console.log(userTone, typeof(userTone), tone);
    const toneString = tone[userTone.toString()].toLowerCase();
    if(userTone !== tone.STANDARD) {
        promptText += prompts.resume_generateResume_tone + toneString; 
    }
    switch(userTone) {
        case tone.CURT:
            promptText += " " + prompts.resume_generateResume_tone_curtDescription;
            break;
        case tone.HAMMY:
            promptText += " " + prompts.resume_generateResume_tone_hammyDescription;
            break;
        default:
    }

    try {

        console.log(promptText);
        const result = await promptLoop(promptText, model, validator);
        return result;

    } catch(err) {
        return {
            valid:false,
            reason:err
        }
    }

}

module.exports = generateResume;