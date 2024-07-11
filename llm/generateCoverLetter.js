const { tone } = require("../datamodels/settings");
const promptLoop = require("./promptLoop");
const prompts = require("./prompts/resumePrompts");

const validator = (result) => {
    if(typeof(result) !== 'object') return false;
    if(typeof(result.success) !== 'boolean') return false;
    if(result.success) {
        if(typeof(result.letter) !== 'object') return false;
        if(!result.letter) return false;
        if(!result.letter.greeting || !result.letter.body || !result.letter.signature) return false;
        if (typeof(result.letter.greeting) !== 'string') return false;
        if (!Array.isArray(result.letter.body) || !result.letter.body.every(item => typeof(item) === 'string')) return false;
        if (typeof(result.letter.signature) !== 'object' || typeof(result.letter.signature.signoff) !== 'string' || typeof(result.letter.signature.name) !== 'string') return false;
    } else {
        if(typeof(result.reason) !== 'string') return false;
    }
    return true;
}

const generateCoverLetter = async (qualifications, jobInfo, userTone, model) => {

    let promptText = prompts.coverLetter_generateLetter_prompt
        + prompts.coverLetter_generateLetter_qualifications + "\n"
        + qualifications + "\n"
        + prompts.coverLetter_generateLetter_jobInfo + "\n"
        + jobInfo + "\n";

    const toneString = tone[userTone.toString()].toLowerCase();
    if(userTone !== tone.STANDARD) {
        promptText += prompts.coverLetter_generateLetter_tone + toneString; 
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

        const result = await promptLoop(promptText, model, validator);
        return result;

    } catch(err) {
        console.log(err);
        return {
            valid:false,
            reason:err
        }
    }

}

module.exports = generateCoverLetter;