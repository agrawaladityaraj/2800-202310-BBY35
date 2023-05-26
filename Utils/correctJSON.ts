// import openai from the config file
import openai from "./openaiConfig";
// import type used for conversing with the API
import { IChatGPTMessage } from "@/models/IChatGPTMessage.js";
// import methods that will create the correct prompt and parse the response from api
import { ILessonResponse, IExerciseResponse } from "@/models";

export default async function correctJSON(
  json: string,
  shape: string,
  type: "exercise" | "lesson"
): Promise<IExerciseResponse | ILessonResponse> {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [generatePrompt(json, shape)],
    temperature: 0.2,
  });

  const data: any = completion.data.choices[0].message;
  if (type === "exercise") {
    const response: IExerciseResponse = JSON.parse(data.content);
    return response;
  } else if (type === "lesson") {
    const response: ILessonResponse = JSON.parse(data.content);
    return response;
  } else {
    throw new Error(`Invalid type: ${type}`);
  }
}

function generatePrompt(json: string, shape: string) {
  const prompt: IChatGPTMessage = {
    role: "user",
    content: `I am a professional in correcting JSON.
    given the following incorrect JSON format:${json}.
    I will correct the JSON to match the following shape:${shape}`,
  };
  return prompt;
}
