import { useState } from "react";
import { IChatGPTMessage } from "@/models";
import { Typography } from "@mui/material";

export default function Reccomendation() {
  const [messages, setMessages] = useState<IChatGPTMessage[]>([]);
  const [value, setValue] = useState<string>("");

  const handleClick = async () => {
    const chatHistory: IChatGPTMessage[] = [
      ...messages,
      { role: "user", content: value },
    ];
    const response = await fetch("/api/openai/generateRecomendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    const message: IChatGPTMessage = data;

    setValue("");
    setMessages([...chatHistory, message]);
  };

  return (
    <div>
      <Typography variant="h4">Lets find the right dog for you!</Typography>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Start Conversation</button>
      {messages.map((message, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor:
              message.role === "user" ? "lightgray" : "lightblue",
          }}
        >
          <p>{`${message.role.toUpperCase()}: ${message.content}`}</p>
        </div>
      ))}
    </div>
  );
}
