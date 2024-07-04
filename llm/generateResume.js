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
            if(!sections[key] && section !== "name") return false;
            console.log("6");
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
                    console.log("failed default", section);
                    return false;
            }
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