import { NextApiRequest, NextApiResponse } from "next";
import { generatePrompt, parseResponse } from "@/Prompts/lesson";
import openai from "@/Utils/openaiConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonInfo = req.body.lessonInfo;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [generatePrompt(lessonInfo)],
  });
  const parsedData = parseResponse(completion);
  res.status(200).json(parsedData);
}
