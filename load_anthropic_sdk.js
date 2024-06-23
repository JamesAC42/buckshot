const Anthropic = require("@anthropic-ai/sdk");
const { anthropicKey } = require("./loadApiKeys");
const anthropic = new Anthropic({
    apiKey: anthropicKey
});

module.exports = anthropic;