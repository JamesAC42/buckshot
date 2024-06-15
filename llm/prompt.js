const models = require("./models");
const anthropicKey = require("../loadApiKeys").anthropicKey;

const promptGPT = async (model, prompt) => {

    let response = await openai.chat.completions.create({
        messages: [{ role: "system", content: userInput }],
        model,
    });
    return response.choices[0].message.content;

}

const promptClaude = async (model, prompt) => {

    let response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
            model,
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }],
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
        let completion = response.data.content[0].text;
        return completion;
    } else {
        throw new Error("Error from Anthropic API");
    }
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
        case models.CLAUDE_OPUS:
            completion = await promptClaude("claude-3-opus-20240229", fullPrompt);
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