const models = require("./models");
const anthropicKey = require("../loadApiKeys").anthropicKey;
const openai = require("../load_oai_sdk");
const anthropic = require("../load_anthropic_sdk");
const { default: Anthropic } = require("@anthropic-ai/sdk");

const promptGPT = async (model, prompt) => {

    let response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model,
    });
    return response.choices[0].message.content;

}

const promptClaude = async (model, prompt) => {

    const message = await anthropic.messages.create({
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }],
        model,
    })
    .catch(async (err) => {
        if (err instanceof Anthropic.APIError) {
            console.log(err.status); // 400
            console.log(err.name); // BadRequestError
            console.log(err.headers); // {server: 'nginx', ...}
        } else {
            throw err;
        }
    });
    
    return message.content[0].text;

}

const prompt = async (model, fullPrompt) => {

    let completion;
    switch (model) {
        case models.GPT_4O:
            completion = await promptGPT("gpt-4o", fullPrompt);
            break;
        case models.GPT_4TURBO:
            completion = await promptGPT("gpt-4-turbo", fullPrompt);
            break;
        case models.CLAUDE35_SONNET:
            completion = await promptClaude("claude-3-5-sonnet-20240620", fullPrompt);
            break;
        default:
            throw new Error("Invalid model provided.");
    }

    return completion;

}

module.exports = {
    promptGPT,
    promptClaude,
    prompt
};