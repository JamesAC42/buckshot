const models = require("../../llm/models");
const checkInput = require("../../llm/checkInput");

async function prompt(req, res) {

    try {

        const userInput = req.body.userInput;

        if(
            typeof(userInput) !== "string" ||
            userInput.length > 1000
        ) {
            res.status(500).json({ error: "Invalid input."});
            return;
        }

        const model = req.body.model;
        if(!models[model]) {
            res.status(400).json({ error: 'Invalid model parameter value' });
            return;
        }

        let inputValid = checkInput(userInput, requiredSections)


      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


}

module.exports = prompt;