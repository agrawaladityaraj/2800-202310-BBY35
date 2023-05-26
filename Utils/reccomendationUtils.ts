// type used for conversing with the API
import type { IChatGPTMessage } from "@/models";

// message to the api that is the set up prompt
const setupPrompt: IChatGPTMessage = {
  role: "system",
  content: `As an AI expert on dog breeds, my purpose is to assist users in finding the perfect breed based on their lifestyle and preferences.
  I'll present a curated list of breeds, explain my recommendations in depth, and steer the conversation towards identifying the best fit.
  If the user strays from the topic or fails to answer a question, I will respectfully guide them back or restate the question.
  Should I require additional details to hone my suggestions, I will further query the user.
  The conversation will commence with any greeting from the user,
  followed by key questions including: size preference, living situation, activity level, grooming preference,
  budget, prior experience with dogs, family situation, climate, personality, age, allergies, other pets, and presence of children.`,
};

// function that wil construct the prompt for the API which includes all the messages from the conversation
export const generatePrompt = (
  conversation: IChatGPTMessage[]
): IChatGPTMessage[] => {
  return [setupPrompt, ...conversation];
};

// function that will parse the response from the API
export const parseResponse = (completion: any): IChatGPTMessage => {
  const data = completion.data.choices[0].message;
  const messageResponse: IChatGPTMessage = {
    role: "assistant",
    content: data.content,
  };
  return messageResponse;
};
