const formatOutputAsMarkdown = (output) => {


    let outputString = "";
    let sectionOrder = [
        "name", "contact info", "summary", "objective", "skills",
        "work history", "education", "projects", "certifications",
        "volunteering", "awards", "academic achievements", "references",
        "hobbies", "websites", "other info"  
    ];

    for(let i = 0; i < sectionOrder.length; i++) {
        let section = sectionOrder[i];
        if(!output[section]) continue;
        if(section === "name") {
            outputString +=
                "## " + output[section] + "\n\n";
        } else {
            outputString += 
                "### " + section + "\n\n";
        }
        switch(section) {
            case "volunteering":
            case "certifications":
            case "awards":
            case "academic achievements":
            case "references":
            case "hobbies":
            case "websites":
            case "other info":
                for(let b = 0; b < output[section].length; b++) {
                    outputString += " - " + output[section][b] + "\n";
                }
                outputString += "\n";
                break;
            case "summary":
            case "objective":
                outputString += output[section] + "\n\n";
                break;
            case "contact info":
                outputString += output[section].map((c) => {
                    return c.label + ": " + c.info
                }).join(" | ") + "\n\n";
                break;
            case "education":
                for(let school = 0; school < output[section].length; school++) {
                    let schoolInfo = output[section][school];
                    outputString += " #### " + schoolInfo.school + " - " + schoolInfo.major + " (" + schoolInfo.dates + ")" + "\n\n";
                    for(let info = 0; info < schoolInfo.description.length; info++) {
                        outputString += " - " + schoolInfo.description[info] + "\n";
                    }
                    outputString += "\n" 
                }
                break;
            case "work history":
                for(let work = 0; work < output[section].length; work++) {
                    let workInfo = output[section][work];
                    outputString += " #### " + workInfo.position + " - " + workInfo.company + " (" + workInfo.dates + ")" + "\n\n";
                    for(let info = 0; info < workInfo.description.length; info++) {
                        outputString += " - " + workInfo.description[info] + "\n";
                    }
                    outputString += "\n" 
                }
                break;
            case "skills":
                let skillTypes = Object.keys(output[section]);
                for(let t = 0; t < skillTypes.length; t++) {
                    outputString += " - " + "__" + skillTypes[t] + "__ - ";
                    outputString += output[section][skillTypes[t]].join(", ");
                    outputString += "\n"
                }
                outputString += "\n";
                break;
            case "projects":
                for(let p = 0; p < output[section].length; p++) {
                    outputString += "**" + output[section][p].name + "** - " + output[section][p].description + "\n";
                }
                outputString += "\n";
            default:
                break;
        }
    }

    return outputString;

}

export default formatOutputAsMarkdown;