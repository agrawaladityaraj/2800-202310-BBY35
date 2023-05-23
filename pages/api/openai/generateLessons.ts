import { NextApiRequest, NextApiResponse } from "next";
// methods that will create the correct prompt and parse the response from api
import { generatePrompt, parseResponse } from "@/PromptUtils/lessonUtils";
// openai from config file which contains the api key and configs the api object
import openai from "@/Utils/openaiConfig";
// import types for lesson request
import { ILessonsRequest, ILessonResponse } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonInfo: ILessonsRequest = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [generatePrompt(lessonInfo)],
    temperature: 0.4,
    presence_penalty: 1,
  });

  const parsedData: ILessonResponse = parseResponse(completion);

  res.status(200).json(parsedData);
}
