// import required types for requesting and sending data to the API
import type {
  ILessonRequest,
  ILessonResponse,
  IChatGPTMessage,
} from "@/models/index";

// define the shape of the response
const shape = `
{
  "lessonFocus": "<lesson focus>",
  "lessonGoals": "<lesson goal>",
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

// define the prompt that will be sent to the API
export const generatePrompt = (lessonInfo: ILessonRequest): IChatGPTMessage => {
  const prompt: IChatGPTMessage = {
    role: "user",
    content: `I am a professional dog trainer.
    I will create a lesson plan specific to this dog:
  
    Dog's age: ${lessonInfo.age}.
    Dog's breed: ${lessonInfo.breed}.
    Dog's energy level: ${lessonInfo.energy}.
    Dog's behaviour: ${lessonInfo.behaviour}.
    Dog's motavation: ${lessonInfo.motavation}.
    
    Area of focus for this lesson: ${lessonInfo.focus}.

    Avoid exercises: ${lessonInfo.avoidExercises}.
    Do not mention these exercises anywhere in the lesson plan.
    
    The lesson will include 3 exercises:
    Each exercise will have:
    - A name of the exercise
    - A goal for the exercise
    - 5 steps with a description of each step
    - 3 tips for the owner
    
    format the response as JSON in the shape of ${shape}`,
  };
  return prompt;
};

// define the function that will parse the response from the API
export const parseResponse = (completion: any): ILessonResponse => {
  const data = completion.data.choices[0].message;
  const lessonResponse: ILessonResponse = JSON.parse(data.content);
  return lessonResponse;
};