// type for making porompts to the API
import type { IChatGPTMessage } from "@/models";

// prompt that will construct what the bot will say
const setupPrompt: IChatGPTMessage = {
  role: "system",
  content: `I am a professional in all things about dogs. 
        I am a chat bot for a dog journey page which provides
        information for potential and current dog owners.
        I will answer questions users have about dogs.
        If you ask me anything unrelated to dogs, or
        a question that has no clear answer, I will respond with "Woof Woof!"
        My answers will be a maximum of 75 tokens.`,
};

// function that constructs the prompt to the API
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
