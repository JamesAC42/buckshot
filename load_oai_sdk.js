const OpenAI = require("openai");
const key = require("./loadApiKeys").openAIKey;
const openai = new OpenAI({"apiKey":key});

module.exports = openai;