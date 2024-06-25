const { prompt } = require("./prompt");
const promptLoop = async (promptText, model, validator) => {

    let attempts = 0;
    let success = false;
    let result;
    while (attempts < 5 && !success) {
        console.log("attempting prompt #", attempts + 1);
        result = null;
        const response = await prompt(model, promptText);
        try {
            console.log(response);
            result = JSON.parse(response);
            console.log(result);
            if (!validator(result)) {
                attempts++;
            } else {
                console.log("good");
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