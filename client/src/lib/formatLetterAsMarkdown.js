const formatLetterAsMarkdown = (letter) => {

    let body = "";
    for(let i = 0; i < letter.body.length; i++) {
        body += letter.body[i] + "\n\n";
    }

    let sections = [];
    sections = [
        {
            name:"greeting",
            text:letter.greeting + "\n\n"
        },
        {
            name:"body",
            text:body
        },
        {
            name:"signature",
            text:letter.signature.signoff + "\n" + letter.signature.name
        }
    ]

    return sections;

}

export default formatLetterAsMarkdown;