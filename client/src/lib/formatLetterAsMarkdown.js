const formatLetterAsMarkdown = (letter) => {

    let outputText = "";

    outputText += letter.greeting + "\n\n";
    for(let i = 0; i < letter.body.length; i++) {
        outputText += letter.body[i] + "\n\n";
    }
    outputText += letter.signature.signoff + "\n" + letter.signature.name;

    return outputText;

}

export default formatLetterAsMarkdown;