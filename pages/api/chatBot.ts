import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.messages;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
    temperature: 0.6, // Lowered this a bit for more consistent responses
    max_tokens: 75, // Increased to allow longer responses
    frequency_penalty: 0.5, // Set this to decrease the likelihood of the model to repeat itself
    presence_penalty: 0.5, // Set this to increase the model's likelihood to introduce new topics
  });

  res.status(200).json({ result: completion.data });
}
