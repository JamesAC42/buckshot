const fs = require("fs");

const openAIKey = JSON.parse(fs.readFileSync('openai_key.json')).key;
const anthropicKey = JSON.parse(fs.readFileSync('anthropic_key.json')).key;

module.exports = {
    openAIKey,
    anthropicKey
}