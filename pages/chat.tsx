import { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const setupPrompt = [
    {
      role: "system",
      content: `I am a professional in all things about dogs. 
          I am a chat bot for a dog journey page which provides
          information for potential and current dog owners.
          I will answer questions users have about dogs.
          If you ask me anything unrelated to dogs, or
          a question that has no clear answer, I will respond with "Woof Woof!"
          I will strive to provide new and unique insights, and avoid unnecessary repetition.
          My answers will be more consistent and focused, up to a maximum of 75 tokens.`,
    },
  ];

  return {
    props: {
      initialConversation: setupPrompt,
    },
  };
};

interface Conversation {
  role: string;
  content: string;
}

interface ChatProps {
  initialConversation: Conversation[];
}

export default function ChatComponent({ initialConversation }: ChatProps) {
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] =
    useState<Conversation[]>(initialConversation);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    const chatHistory = [...conversation, { role: "user", content: value }];
    const response = await fetch("/api/chatBot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    setValue("");
    setConversation([
      ...chatHistory,
      { role: "assistant", content: data.result.choices[0].message.content },
    ]);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };

  const handleClear = () => {
    inputRef.current?.focus();
    setValue("");
    setConversation(initialConversation);
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
