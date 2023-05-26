// requires types for making and receiving data from the API
import type {
  ILessonsRequest,
  IChatGPTMessage,
  ILessonResponse,
} from "@/models";
// function that will correct the JSON response from the API, if it is not valid
import correctJSON from "@/Utils/correctJSON";

const shape = `
{
    "lessons": [
        {
            "lessonName": "<lesson 1 name>",
            "lessonObjectives": [
                "<lesson 1 objective>",
                "<lesson 2 objective>",
                "<lesson 3 objective>"
            ],
            "lessonReason": "<lesson 1 reason>"
        }
    ]
}
`;

// function that will construct the prompt to the API
export const generatePrompt = (
  lessonInfo: ILessonsRequest
): IChatGPTMessage => {
  const prompt: IChatGPTMessage = {
    role: "user",
    content: `I am a professional dog trainer.
        I will create a lesson plan specific to this dog:
        The lesson plan will consist of ${lessonInfo.numberOfLessons} lessons.
        The dog is ${lessonInfo.age} years old.
        The dog is a ${lessonInfo.breed}.
        The dog's energy level is ${lessonInfo.energy}.
        The dog's behaviour is ${lessonInfo.behaviour}.
        The dog's motivation is ${lessonInfo.motivation}.
        The owner's goals are ${lessonInfo.ownerGoals}.
        The lesson plan will include ${lessonInfo.numberOfLessons} lessons.
        Each lesson will have:
        - Name of the lesson
        - 3 objectives
        - Reason for the lesson
        format the response as JSON in the shape of ${shape}`,
  };
  return prompt;
};

// function that will parse the response from the API
export const parseResponse = async (
  completion: any
): Promise<ILessonResponse> => {
  const data = completion.data.choices[0].message;

  try {
    const lessonResponse: ILessonResponse = JSON.parse(data.content);
    return lessonResponse;
  } catch (error) {
    console.log("Error parsing JSON, attempting to correct...", error);
    try {
      const correctedResponse = (await correctJSON(
        data.content,
        shape,
        "lesson"
      )) as ILessonResponse;
      return correctedResponse;
    } catch (correctionError) {
      console.log("Error correcting JSON", correctionError);
      throw new Error("Failed to parse and correct JSON");
    }
  }
};
