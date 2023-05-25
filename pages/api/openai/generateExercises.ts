// import openai from config file which contains the api key and configs the api object
import openai from "@/Utils/openaiConfig";
// import route handler types from next
import { NextApiRequest, NextApiResponse } from "next";
// import methods that will create the correct prompt and parse the response from api
import { generatePrompt, parseResponse } from "@/Utils/exerciseUtils";
// import types for lesson request
import { IExerciseRequest, IExerciseResponse } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const exerciseInfo: IExerciseRequest = req.body.exerciseInfo;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [generatePrompt(exerciseInfo)],
      temperature: 0.4,
      presence_penalty: 1,
    });

    try {
      const parsedData: IExerciseResponse = await parseResponse(completion);
      res.status(200).json(parsedData);
    } catch (parsedError) {
      console.log("Error parsing response", parsedError);
      res.status(500).json({ error: "Error parsing response" });
    }
  } catch (completionError) {
    console.log("Error completing request", completionError);
    res.status(500).json({ error: "Error completing request" });
  }
}
