// import openai from the config file
import openai from "@/Utils/openaiConfig";
// route handler types are imported from next
import { NextApiRequest, NextApiResponse } from "next";
// import methods that will create the correct prompt and parse the response from api
import { generatePrompt, parseResponse } from "@/Utils/chatUtils";
// import the type used for conversing with the API
import { IChatGPTMessage } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const messages: IChatGPTMessage[] = req.body.messages;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: generatePrompt(messages),
      temperature: 0.6,
      max_tokens: 150,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    try {
      const parsedData: IChatGPTMessage = parseResponse(completion);
      res.status(200).json(parsedData);
    } catch (parsingError) {
      console.error("Error parsing response: ", parsingError);
      res.status(500).json({ error: "Error parsing response" });
    }
  } catch (completionError) {
    console.error("Error generating response: ", completionError);
    res.status(500).json({ error: "Error generating response" });
  }
}
