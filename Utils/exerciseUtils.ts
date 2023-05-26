// import required types for requesting and recieving data to the API
import type {
  IExerciseRequest,
  IExerciseResponse,
  IChatGPTMessage,
} from "@/models";
// function that will correct the JSON response from the API, if it is not valid
import correctJSON from "@/Utils/correctJSON";

// shape of the response from the API
const shape = `
{
  "exercises": [
      {
          "name": "<exercise 1 name>",
          "objective": "<exercise 1 objective>",
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

// prompt that will construct the request to the API
export const generatePrompt = (
  exerciseInfo: IExerciseRequest
): IChatGPTMessage => {
  const prompt: IChatGPTMessage = {
    role: "user",
    content: `I am a professional dog trainer.
    I will create a exercises specific to this dog for the specified lesson.:
  
    Dog's age: ${exerciseInfo.age}.
    Dog's breed: ${exerciseInfo.breed}.
    Dog's energy level: ${exerciseInfo.energy}.
    Dog's behaviour: ${exerciseInfo.behaviour}.
    Dog's motavation: ${exerciseInfo.motivation}.
    
    Details about this lesson: ${exerciseInfo.lesson}.
    
    The lesson will include 3 exercises:
    Each exercise will have:
    - Name of the exercise
    - The goal  for the exercise
    - 5 steps with a description of each step
    - 3 tips for the owner
    
    format the response as JSON in the shape of ${shape}`,
  };
  return prompt;
};

// function that will parse the response from the API
export const parseResponse = async (
  completion: any
): Promise<IExerciseResponse> => {
  const data = completion.data.choices[0].message;

  try {
    const exerciseResponse: IExerciseResponse = JSON.parse(data.content);
    return exerciseResponse;
  } catch (error) {
    console.log("Error parsing JSON, attempting to correct...", error);
    try {
      const correctedResponse = (await correctJSON(
        data.content,
        shape,
        "exercise"
      )) as IExerciseResponse;
      return correctedResponse;
    } catch (error) {
      console.log("Error correcting JSON", error);
      throw new Error("Error correcting JSON");
    }
  }
};
