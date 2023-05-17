/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "Open ai was not configured correctly",
      },
    });
    return;
  }

  const dog = req.body.dog || "";

  try {
    const completion = await openai.Completion.create({
      model: "text-davinci-003",
      prompt: generatePrompt(dog),
      max_tokens: 1000,
    });
    // if null then error
    if (!completion.data.choices) {
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
      return;
    }
    let result = completion.data.choices[0].text;
    try {
      console.log(result);
      res.status(200).json({ result });
    } catch (error) {
      console.error(`Error parsing OpenAI API response as JSON: ${error}`);
      res.status(500).json({
        error: {
          message:
            "An error occurred parsing the response from the OpenAI API.",
        },
      });
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

const generatePrompt = (dog: any) => {
  console.log(dog);
  return `
    You are a professional dog trainer. I want you to create 
    a training plan for the following dog. Each exercise should include:
    - Exercise Name
    - Steps (separated by semicolons)
    - Duration in minutes
    - Objective of the exercise
    - Additional tips or precautions (if any)

    Please format nicely and use bullet points for each exercise.

    Dog Details:
    - Focus: ${dog.focus}
    - Breed: ${dog.breed}
    - Age: ${dog.age}
    - Energy Level: ${dog.energy}
    - Behaviour: ${dog.behaviour}
    - Rewards/Motivators: ${dog.reward}
    `;
};
