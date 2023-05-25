import { NextApiRequest, NextApiResponse } from "next";
// methods that will create the correct prompt and parse the response from api
import {
  generatePrompt as generateLessonPrompt,
  parseResponse as parseLessonResponse,
} from "@/PromptUtils/lessonUtils";
// methods that will create the correct prompt and parse the response from api
import { generatePrompt as generateExercisePrompt } from "@/PromptUtils/exerciseUtils";
// openai from config file which contains the api key and configs the api object
import openai from "@/Utils/openaiConfig";
// import types for lesson request
import {
  ILessonsRequest,
  ILessonResponse,
  ILessonExerciseDetails,
  IExerciseResponse,
} from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonInfo: ILessonsRequest = req.body;

  const lessonCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [generateLessonPrompt(lessonInfo)],
    temperature: 0.4,
    presence_penalty: 1,
  });

  const parsedData: ILessonResponse = await parseLessonResponse(
    lessonCompletion
  );
  console.log(parsedData);
  const exercisesCompletion = await Promise.all(
    parsedData.lessons.map((lesson: ILessonExerciseDetails) =>
      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          generateExercisePrompt({
            age: lessonInfo.age,
            breed: lessonInfo.breed,
            energy: lessonInfo.energy,
            behaviour: lessonInfo.behaviour,
            motivation: lessonInfo.motivation,
            lesson,
          }),
        ],
        temperature: 0.4,
        presence_penalty: 1,
      })
    )
  );
  res.status(200).json(parsedData);
}
