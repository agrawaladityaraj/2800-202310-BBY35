import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

const shape = `
{
  "lessonName": "<lesson name>",
  "lessonGoal": "<lesson goal>",
  "lessonFocus": "<lesson focus>",
  "lessonObjectives": [
      "<lesson objective1>",
      "<lesson objective2>",
      "<lesson objective3>"
  ],
  "exercises": [
      {
          "name": "<exercise 1 name>",
          "goal": "<exercise 1 goal>",
          "steps": [
              "<step 1 description>",
              "<step 2 description>",
              "<step 3 description>",
              "<step 4 description>",
              "<step 5 description>"
          ],
          "tips": [
              "<tip 1>",
              "<tip 2>",
              "<tip 3>"
          ]
      }
  ]
}
`;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lessonInfo = req.body.lessonInfo;
  const prompt = generatePrompt(lessonInfo);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  const data = completion.data.choices[0].message;
  console.log("full data", data);
  const returnData = data.content;
  const parsedData = JSON.parse(returnData);
  console.log("data from consolelog", parsedData);
  res.status(200).json(parsedData);
}

const generatePrompt = (lessonInfo: any) => {
  return `I am a professional dog trainer.

  I will create a lesson plan specific to this dog:

  Dog's age: ${lessonInfo.age}.
  Dog's breed: ${lessonInfo.breed}.
  Dog's energy level: ${lessonInfo.energy}.
  Dog's behaviour: ${lessonInfo.behaviour}.
  Dog's motavation: ${lessonInfo.reward}.
  
  The lesson will include 3 exercises:
  Area of focus for this lesson: ${lessonInfo.focus}.
  Each exercise will have:
  - A name of the exercise
  - A goal for the exercise
  - 5 steps with a description of each step
  - 3 tips for the owner
  
  format the response as JSON in the shape of ${shape}`;
};
