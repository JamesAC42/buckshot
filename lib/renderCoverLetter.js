const templateHeader_one = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://fonts.googleapis.com/css2?family=Wittgenstein:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
    <style>

        body {
`;

const templateHeader_two = `
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
                font-size:12px;
                line-height: 1.6;
                margin: 0 50px;
                margin-top: 15px;
                padding: 0px;
                max-width:800px;

                background:#fff;
                color: #333;
                color: #151313;
            }

            .date {
                margin-top:20px;
                padding:20px 0;
                text-align:right;
                font-weight:600;
            }

            p {
                text-indent: 2em;
                text-align:justify;
            }

            .signature {
                padding:10px 0;
            }

        </style>
    </head>
    <body>
`;

const templateFooter = `
    </body>
</html>
`;

const renderCoverLetter = (output, textStyle) => {

    let outputString = "";

    outputString += templateHeader_one;
    if(textStyle === "serif") {
        outputString += `font-family: 'Wittgenstein', serif;\n`;
    } else if(textStyle === "sans-serif") {
        outputString += `font-family: 'Nunito Sans', sans-serif;\n`
    }
    outputString += templateHeader_two; 

    console.log(output);

    outputString += "<div class='date'>" + new Date().toLocaleDateString() + "</div>\n";
    outputString += "<p>" + output.greeting + "</p>\n";

    for(let i = 0; i < output.body.length; i++) {
        outputString += "<p>" + output.body[i] + "</p>\n";
    }

    outputString += "<div class='signature'>\n"
        + "<p>" + output.signature.signoff + "</p>\n"
        + "<p>" + output.signature.name + "</p>\n"
        + "</div>";
    
    outputString += templateFooter; 


    console.log(outputString);

    return outputString;

}

module.exports = renderCoverLetter;