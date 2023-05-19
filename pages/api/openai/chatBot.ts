import { NextApiRequest, NextApiResponse } from "next";
import { generatePrompt, parseResponse } from "@/PromptUtils/chatUtils";
import openai from "@/Utils/openaiConfig";
import { IChatGPTMessage } from "@/models";

// this function will make an api call and rturn the result
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const conversation = req.body.messages;
  const prompt = generatePrompt(conversation);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
    temperature: 0.6,
    max_tokens: 150,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });
  const parsedData = parseResponse(completion);

  res.status(200).json({ role: "assistant", content: parsedData });
}
