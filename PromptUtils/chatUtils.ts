import type { IChatGPTMessage } from "@/models/index";

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

// define the prompt that will be sent to the API
export const generatePrompt = (
  conversation: IChatGPTMessage[]
): IChatGPTMessage[] => {
  return [setupPrompt, ...conversation];
};

// define the function that will parse the response from the API
export const parseResponse = (completion: any) => {
  // console.log(completion);
  const data = completion.data.choices[0].message;
  // console.log(data);
  const messageResponse = data.content;

  return messageResponse;
};
