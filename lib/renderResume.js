const templateHeader_one = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Wittgenstein:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Baskervville+SC&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
        <style>

            @page {
                margin: 0;
                padding: 0;
                size: letter;
            }
            body, html {
                margin: 0;
                padding: 0;
            }

            body {
`
const templateHeader_two = `
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;

                line-height: 1.4;
                
                max-width:800px;
                
                background:#fff;
                color: #333;
                color: #151313;
                
            }

            h2, h3 {
                font-weight: 700;
            }

            h1 {
                margin-top:0px;
                margin-bottom:5px;
                font-size: 22px;
                text-align: center;
                padding-bottom: 0;
            }

            .section {
                margin-bottom: 15px;
            }

            h2 {
                font-size: 14px;
                border-bottom: 1px solid #ccc;
                margin:0;
                margin-bottom:5px;
            }

            h3 {
                font-size: 14px;
                margin:0;
            }

            h4 {
                font-size:12px;
            }

            h3,h4 {
                padding-left:8px;
            }

            h4.major, h4.company {
                font-weight:200;
                margin:0;
            }

            .contact-info {
                display:flex;
                justify-content: center;
                display: -webkit-box; /* wkhtmltopdf uses this one */
                -webkit-box-pack: center; /* wkhtmltopdf uses this one */
                justify-content: center;
            }

            .contact-info-item {
                font-size:12px;
                margin-right:15px;
            }

            .contact-info-item:last-child {
                margin-right:0;
            }

            ul {
                list-style-type: none;
                padding-left: 20px;
                margin:5px 0;
            }

            li::before {
                content: "•";
                padding-right: 8px;
            }

            .date {
                font-weight: 400;
                font-size:11px;
            }

            .skill-type, .project-name {
                font-weight: 500;
            }

            p {
                margin:0;
            }

            p,li {
                font-size:12px;
            }
        </style>
    </head>
    <body>
`;

const templateFooter = `
    </body>
</html>
`;

const renderResume = (output, textStyle) => {

    let outputString = "";
    let sectionOrder = [
        "name", "contact info", "summary", "objective", "skills",
        "work history", "education", "projects", "certifications",
        "volunteering", "awards", "academic achievements", "references",
        "hobbies", "websites", "other info"  
    ];

    outputString += templateHeader_one;
    if(textStyle === "serif") {
        outputString += `font-family: 'Wittgenstein', serif;\n`;
    } else if(textStyle === "sans-serif") {
        outputString += `font-family: 'Nunito Sans', sans-serif;\n`
    }
    outputString += templateHeader_two; 

    for(let i = 0; i < sectionOrder.length; i++) {
        let section = sectionOrder[i];
        if(!output[section]) continue;
        if(section === "name") {
            outputString +=
                "<h1>" + output[section] + "</h1>";
        } else {
            if(section === "contact info") {
                outputString += "<div class='section contact-info'>";
            } else {
                outputString += `
                    <div class='section'>
                        <h2>${section.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                `
            }
        }
        outputString += "\n";

        switch(section) {
            case "volunteering":
            case "certifications":
            case "awards":
            case "academic achievements":
            case "references":
            case "hobbies":
            case "websites":
            case "other info":
                outputString += "<ul>";
                for(let b = 0; b < output[section].length; b++) {
                    outputString += "<li>" + output[section][b] + "</li>\n"
                }
                outputString += "</ul>\n";
                break;
            case "summary":
            case "objective":
                outputString += "<p>" + output[section] + "</p>\n";
                break;
            case "contact info":
                for(let c = 0; c < output[section].length; c++) {
                    outputString += `
                     <div class='contact-info-item'>${output[section][c].info}</div>
                    \n`;
                }
                break;
            case "education":
                for(let school = 0; school < output[section].length; school++) {
                    let schoolInfo = output[section][school];
                    outputString += `
                    <h3>${schoolInfo.school} <span class='date'>${schoolInfo.dates}</span></h3>
                    <h4 class='major'>${schoolInfo.major}</h4>
                    <ul>
                    \n`;
                    for(let info = 0; info < schoolInfo.description.length; info++) {
                        outputString += "<li>" + schoolInfo.description[info] + "</li>\n"
                    }
                    outputString += "</ul>\n";
                }
                break;
            case "work history":
                for(let work = 0; work < output[section].length; work++) {
                    let workInfo = output[section][work];
                    outputString += `
                    <h3>${workInfo.position} <span class='date'>${workInfo.dates}</span></h3>
                    <h4 class='company'>${workInfo.company}</h4>
                    <ul>
                    \n`;
                    
                    for(let info = 0; info < workInfo.description.length; info++) {
                        outputString += "<li>" + workInfo.description[info] + "</li>\n";
                    }
                    outputString += "</ul>\n" 
                }
                break;
            case "skills":
                let skillTypes = Object.keys(output[section]);
                outputString += "<ul>";
                for(let t = 0; t < skillTypes.length; t++) {
                    outputString += 
                        "<li><span class='skill-type'>" + skillTypes[t] + ": </span>" + output[section][skillTypes[t]].join(", ") + "</li>\n"; 
                }
                outputString += "</ul>\n";
                break;
            case "projects":
                outputString += "<ul>";
                for(let p = 0; p < output[section].length; p++) {
                    outputString += "<li><span class='project-name'>" + output[section][p].name + " - </span>" + output[section][p].description + "</li>\n";
                }
                outputString += "</ul>\n";
            default:
                break;
        }

        if(section !== "name") {
            outputString += "</div>\n\n"
        }
    }

    outputString += templateFooter;

    return outputString;

}

module.exports = renderResume;