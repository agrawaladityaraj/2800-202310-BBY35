import { useState } from "react";
import { IChatGPTMessage } from "@/models";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";

export default function Recommendation() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<IChatGPTMessage[]>([
    {
      role: "assistant",
      content:
        "I'm here to help you find the perfect dog breed for you. To start, what size of dog are you looking for? Small, medium or large?",
    },
  ]);

  const sendMessage = async () => {
    if (value.trim() === "" || isFetching) return;

    setIsFetching(true);

    const userMessage: IChatGPTMessage = { role: "user", content: value };
    setConversation([...conversation, userMessage]);
    setValue("");

    const response = await fetch("/api/openai/generateRecomendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [...conversation, userMessage] }),
    });
    const data = await response.json();
    const message: IChatGPTMessage = data;
    setConversation((prev) => [...prev, message]);
    setIsFetching(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await sendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TypeAnimation
        wrapper="h2"
        style={{
          fontWeight: 600,
        }}
        sequence={["Let's Find Your Perfect Dog Breed!"]}
        cursor={false}
      />
      <Box sx={{ maxWidth: "600px" }} flexGrow={1} overflow="auto">
        {conversation.map((item, index) => {
          if (item.role === "system") return null;
          const isUser = item.role === "user";
          return (
            <Box
              key={index}
              mb={1}
              display="flex"
              justifyContent={isUser ? "flex-end" : "flex-start"}
            >
              <Paper
                elevation={1}
                style={{
                  padding: "10px",
                  maxWidth: "70%",
                  backgroundColor: isUser ? "#A1EAFB" : "#E8EAF6",
                }}
              >
                <Typography variant="body2">{item.content}</Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        sx={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "600px",
          paddingTop: "2em",
          paddingBottom: "2em",
        }}
      >
        <TextField
          placeholder="Type here..."
          value={value}
          fullWidth
          multiline
          variant="outlined"
          InputProps={{
            style: {
              background: "transparent",
              border: "none",
              boxShadow: "none",
            },
          }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isFetching}
          sx={{ flexGrow: 1, marginRight: "10px", color: "white" }}
        />
        <Button
          onClick={sendMessage}
          disabled={isFetching}
          sx={{
            color: "black",
            backgroundColor: "#A1EAFB",
            "&:hover": {
              backgroundColor: "#E8EAF6",
              "@media (hover: none)": {
                backgroundColor: "#A1EAFB",
              },
            },
          }}
        >
          {isFetching ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="button" sx={{ textTransform: "none" }}>
              Enter
            </Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
}
