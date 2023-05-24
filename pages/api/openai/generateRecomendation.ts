import { NextApiRequest, NextApiResponse } from "next";
import {
  generatePrompt,
  parseResponse,
} from "@/PromptUtils/reccomendationUtils";

import openai from "@/Utils/openaiConfig";
import { IChatGPTMessage } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages: IChatGPTMessage[] = req.body.messages;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: generatePrompt(messages),
    temperature: 0.4,
    presence_penalty: 1,
  });

  res.status(200).json(parseResponse(completion));
}
