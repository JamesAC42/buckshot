const { prompt } = require("./prompt");

const cleanJsonString = (jsonString) => {
    // Remove any newline characters
    let cleaned = jsonString.replace(/\n|\r/g, '');

    // Ensure all quotes within the "letter" value are escaped
    cleaned = cleaned.replace(
        /(?<=letter":")(.+?)(?="})/,
        (match) => match.replace(/"/g, '\\"')
    );

    return cleaned;
};

const promptLoop = async (promptText, model, validator) => {

    let attempts = 0;
    let success = false;
    let result;
    while (attempts < 5 && !success) {
        result = null;
        const response = await prompt(model, promptText);
        const cleaned = cleanJsonString(response);
        try {
            result = JSON.parse(cleaned);
            if (!validator(result)) {
                attempts++;
            } else {
                success = true;
                break;
            }
        } catch (err) {
            console.log(err);
            console.log("something went wrong");
            attempts++;
        }
    }

    if (attempts === 5 && !success) {
        throw new Error("Could not generate a valid response.");
    }

    return result;

}

module.exports = promptLoop;