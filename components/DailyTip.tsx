import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import type { IChatGPTMessage } from "@/models/index";

export default function ChatComponent() {
const [value, setValue] = useState<string>("");
const [conversation, setConversation] = useState<IChatGPTMessage[]>([]);
const [buttonDisabled, setButtonDisabled] = useState(false);

 // This is the function that sends the message to the chatbot
  const sendMessage = async () => {
    setButtonDisabled(true);
    const chatHistory: IChatGPTMessage[] = [
      ...conversation,
      { role: "user", content: "Give me a tip or advice about taking care of dogs or being a dog owner" },
    ];
    const response = await fetch("/api/openai/generateChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    // This is the response from the chatbot, also updates the conversation
    const data = await response.json();
    const message: IChatGPTMessage = data;
    setValue("");
    setConversation([...chatHistory, message]);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 24 * 60 * 60 * 1000);
  };

 

  return (
    <>
      <Box paddingTop={5} textAlign="center">
        <Button variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={buttonDisabled}
        >
          Tip of the Day!</Button>
        {conversation.map((item, index) => {
        if (item.role === "user") return null;
        return (
          <div key={index}>
            <Typography variant="body1">{item.content}</Typography>
          </div>
        );
      })}
      </Box>
    </>
  );
}
