import { NextApiRequest, NextApiResponse } from "next";
// methods that will create the correct prompt and parse the response from api
import { generatePrompt, parseResponse } from "@/PromptUtils/chatUtils";
// openai from config file which contains the api key and configs the api object
import openai from "@/Utils/openaiConfig";
// import types for gpt chat messages
import { IChatGPTMessage } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages: IChatGPTMessage[] = req.body.messages;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: generatePrompt(messages),
    temperature: 0.6,
    max_tokens: 150,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });
  const parsedData: IChatGPTMessage = parseResponse(completion);

  res.status(200).json(parsedData);
}
