import { NextApiRequest, NextApiResponse } from "next";
// import methods that will create the correct prompt and parse the response from api
import { generatePrompt, parseResponse } from "@/PromptUtils/lessonUtils";
// import openai from config file which contains the api key and configs the api object
import openai from "@/Utils/openaiConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get the lesson info from the request body
  const lessonInfo = req.body.lessonInfo;
  // create the completion with the correct prompt
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [generatePrompt(lessonInfo)],
  });
  // parse the response from the api
  const parsedData = parseResponse(completion);
  // return the parsed data
  res.status(200).json(parsedData);
}
