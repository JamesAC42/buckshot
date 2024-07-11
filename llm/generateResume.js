const { sections, tone } = require("../datamodels/settings");
const promptLoop = require("./promptLoop");
const prompts = require("./prompts/resumePrompts");

const validator = (result) => {
    if(typeof(result) !== 'object') return false;
    if(typeof(result.success) !== 'boolean') return false;
    if(!result.success && typeof(result.reason) !== 'string') return false;
    if(result.success) {
        if(typeof(result.resume) !== 'object') return false;
        for(let section of Object.keys(result.resume)) {
            let key = section.toUpperCase().replace(" ","_");
            if(!sections[key] && section !== "name") return false;
            switch(key) {
                case sections.VOLUNTEERING:
                case sections.CERTIFICATIONS:
                case sections.AWARDS:
                case sections.ACADEMIC_ACHIEVEMENTS:
                case sections.REFERENCES:
                case sections.HOBBIES:
                case sections.WEBSITES:
                case sections.OTHER_STUFF:
                    if (!Array.isArray(result.resume[section]) || !result.resume[section].every(item => typeof item === 'string')) {
                        return false;
                    }
                    break;
                case sections.SUMMARY:
                case sections.OBJECTIVE:
                case "NAME":
                    if (typeof result.resume[section] !== 'string') {
                        return false;
                    }
                    break;
                case sections.CONTACT_INFO:
                    if (!Array.isArray(result.resume[section])) {
                        return false;
                    }
                    for (let item of result.resume[section]) {
                        if (typeof item !== 'object' || typeof item.label !== 'string' || typeof item.info !== 'string') {
                            return false;
                        }
                    }
                    break;
                case sections.EDUCATION:
                    if (!Array.isArray(result.resume[section])) {
                        return false;
                    }
                    for (let item of result.resume[section]) {
                        if (typeof item !== 'object' || typeof item.school !== 'string' || typeof item.dates !== 'string' || typeof item.major !== 'string') {
                            return false;
                        }
                        if (!Array.isArray(item.description) || !item.description.every(desc => typeof desc === 'string')) {
                            return false;
                        }
                    }
                    break;
                case sections.WORK_HISTORY:
                    if (!Array.isArray(result.resume[section])) {
                        return false;
                    }
                    for (let item of result.resume[section]) {
                        if (typeof item !== 'object' || typeof item.position !== 'string' || typeof item.company !== 'string' || typeof item.dates !== 'string') {
                            return false;
                        }
                        if (!Array.isArray(item.description) || !item.description.every(desc => typeof desc === 'string')) {
                            return false;
                        }
                    }
                    break;
                case sections.SKILLS:
                    if (typeof result.resume[section] !== 'object' || Array.isArray(result.resume[section])) {
                        return false;
                    }
                    for (let key in result.resume[section]) {
                        if (typeof key !== 'string' || !Array.isArray(result.resume[section][key]) || !result.resume[section][key].every(item => typeof item === 'string')) {
                            return false;
                        }
                    }
                    break;
                case sections.PROJECTS:
                    if (!Array.isArray(result.resume[section])) {
                        return false;
                    }
                    for (let item of result.resume[section]) {
                        if (typeof item !== 'object' || typeof item.name !== 'string' || typeof item.description !== 'string') {
                            return false;
                        }
                    }
                    break;
                default:
                    return false;
            }
        }
    }
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

module.exports = generateResume;