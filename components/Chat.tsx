import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

type Message = {
  user: string;
  text: string;
};

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    const defaultPrompt = `
    I am a dog expert. 
    If you ask me anything related about dogs, 
    I will answer you. 
    If you ask me anything unrelated about dogs, 
    or has no clear answer I will respond with "Woof Woof".
    I will limit my answer to a maximum of 150 tokens.`;

    const fullPrompt = `${defaultPrompt}\n\n ${message}`;

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: fullPrompt }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setChat([
      ...chat,
      { user: "User", text: message },
      { user: "AI", text: data.response },
    ]);
    setMessage("");
  };

  return (
    <div>
      <Typography variant="h4">Chat</Typography>
      <div>
        {chat.map((message, index) => (
          <Typography key={index}>
            <b>{message.user}:</b> {message.text}
          </Typography>
        ))}
      </div>
      <TextField value={message} onChange={handleMessageChange} />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default ChatComponent;
