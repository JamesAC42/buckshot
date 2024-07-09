const formatOutputAsMarkdown = (output) => {

    let sections = [];

    let sectionOrder = [
        "name", "contact info", "summary", "objective", "skills",
        "work history", "education", "projects", "certifications",
        "volunteering", "awards", "academic achievements", "references",
        "hobbies", "websites", "other info"  
    ];

    for(let i = 0; i < sectionOrder.length; i++) {
        let section = sectionOrder[i];
        if(!output[section]) continue;

        let sectionItem = { name: section };
        let text = "";
        switch(section) {
            case "name":
                text = "## " + output[section] + "\n\n";
                break;
            case "volunteering":
            case "certifications":
            case "awards":
            case "academic achievements":
            case "references":
            case "hobbies":
            case "websites":
            case "other info":
                for(let b = 0; b < output[section].length; b++) {
                    text += " - " + output[section][b] + "\n";
                }
                text += "\n";
                break;
            case "summary":
            case "objective":
                text += output[section] + "\n\n";
                break;
            case "contact info":
                text += "";
                text += output[section].map((c) => {
                    return c.label + ": " + c.info.replaceAll("@","~@~");
                }).join(" | ") + "\n\n";
                break;
            case "education":
                for(let school = 0; school < output[section].length; school++) {
                    let schoolInfo = output[section][school];
                    text += " #### " + schoolInfo.school + " - " + schoolInfo.major + " (" + schoolInfo.dates + ")" + "\n\n";
                    for(let info = 0; info < schoolInfo.description.length; info++) {
                        text += " - " + schoolInfo.description[info] + "\n";
                    }
                    text += "\n" 
                }
                break;
            case "work history":
                for(let work = 0; work < output[section].length; work++) {
                    let workInfo = output[section][work];
                    text += " #### " + workInfo.position + " - " + workInfo.company + " (" + workInfo.dates + ")" + "\n\n";
                    for(let info = 0; info < workInfo.description.length; info++) {
                        text += " - " + workInfo.description[info] + "\n";
                    }
                    text += "\n" 
                }
                break;
            case "skills":
                let skillTypes = Object.keys(output[section]);
                for(let t = 0; t < skillTypes.length; t++) {
                    text += " - " + "__" + skillTypes[t] + "__ - ";
                    text += output[section][skillTypes[t]].join(", ");
                    text += "\n"
                }
                text += "\n";
                break;
            case "projects":
                for(let p = 0; p < output[section].length; p++) {
                    text += "**" + output[section][p].name + "** - " + output[section][p].description + "\n";
                }
                text += "\n";
            default:
                break;
        }
        
        sectionItem.text = text;
        sections.push(sectionItem);
    }

    return sections;

}

export default formatOutputAsMarkdown;