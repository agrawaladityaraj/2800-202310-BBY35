import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

// set up the configuration for the API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// this function will make an api call and rturn the result
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.messages;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
    temperature: 0.6,
    max_tokens: 75,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  res.status(200).json({ result: completion.data });
}
