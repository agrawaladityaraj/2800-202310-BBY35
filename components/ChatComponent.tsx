import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import type { IChatGPTMessage } from "@/models/index";

export default function ChatComponent() {
  // states for the value of the input and the conversation
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<IChatGPTMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // This is the function that sends the message to the chatbot
  const sendMessage = async () => {
    const chatHistory: IChatGPTMessage[] = [
      ...conversation,
      { role: "user", content: value },
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
  };

  // This is the function that handles the enter key, which will call the sendMessage function
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };

  // This is the function that handles the clear button, which will clear the input and conversation
  const handleClear = () => {
    inputRef.current?.focus();
    setValue("");
    setConversation([]);
  };

  return (
    <>
      <Typography variant="h4">Chat</Typography>
      <button onClick={handleClear}>Clear</button>
      <button onClick={sendMessage}>enter</button>
      <input
        placeholder="type here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {conversation.map((item, index) => {
        if (item.role === "system") return null;
        return (
          <div key={index}>
            <Typography variant="h6">{item.role}</Typography>
            <Typography variant="body1">{item.content}</Typography>
          </div>
        );
      })}
    </>
  );
}
