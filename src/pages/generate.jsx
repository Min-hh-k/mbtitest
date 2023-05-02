// import * as dotenv from "dotenv";

// // dotenv 사용
// dotenv.config({ path: __dirname + "/.env" });

// openAI name Generate 사용
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openAiFunc = async (req, res) => {
  const animal = req.body.animal || "";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `suggest three pet names for the follow ${animal}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: response.data.choices[0].text });
};

export default openAiFunc;
