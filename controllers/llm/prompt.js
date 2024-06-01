const anthropicKey = require("../../loadApiKeys").anthropicKey;
const axios = require('axios');
const openai = require("../../load_oai_sdk");

async function prompt(req, res, model, redisClient) {

    try {
        const userInput = req.body.userInput;
        console.log(userInput);

        const model = req.body.model;
        if(model !== "GPT" && model !== "CLAUDE") {
            res.status(400).json({ error: 'Invalid model parameter value' });
            return;
        }

        console.log(model);

        let completion, response;
        switch(model) {

            case "CLAUDE":
                response = await axios.post(
                  'https://api.anthropic.com/v1/messages',
                    {
                        model: 'claude-3-opus-20240229',
                        max_tokens: 1024,
                        messages: [{ role: 'user', content: userInput }],
                    },
                    {
                        headers: {
                        'x-api-key': anthropicKey,
                        'anthropic-version': '2023-06-01',
                        'content-type': 'application/json',
                        },
                    }
                );
                
                if (response.status === 200) {
                    completion = response.data.content[0].text;
                    break;
                } else {
                    res.status(response.status).json({ error: 'Error from Anthropic API' });
                    return;
                }
                
            case "GPT":        
            default:

                response = await openai.chat.completions.create({
                    messages: [{ role: "system", content: userInput }],
                    model: "gpt-4o",
                });
                console.log(response);
                completion = response.choices[0];
        }
        
        res.json({ completion });

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


}

module.exports = prompt;