import { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import type { IChatGPTMessage } from "@/models/index";

export default function ChatComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<IChatGPTMessage[]>([
    { role: "assistant", content: "Hello, I'm a chatbot. How can I help you?" },
  ]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    if (value.trim() === "" || isFetching) return;

    setIsFetching(true);
    const userMessage: IChatGPTMessage = { role: "user", content: value };
    setConversation([...conversation, userMessage]);
    setValue("");

    const response = await fetch("/api/openai/generateChat", {
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
    inputRef.current?.focus();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };

  const toggleChat = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={toggleChat}>
        <ChatIcon />
      </IconButton>
      <Dialog open={open} onClose={toggleChat} fullWidth maxWidth="sm">
        <DialogTitle>IntelliPaws Chat</DialogTitle>
        <DialogContent
          style={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            flexGrow={1}
            overflow="auto"
            sx={{
              "::-webkit-scrollbar": {
                width: "10px",
              },
              "::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
              paddingRight: "20px",
            }}
          >
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
          <Box mt={2} display="flex" justifyContent="space-between">
            <TextField
              inputRef={inputRef}
              placeholder="Type here..."
              value={value}
              fullWidth
              variant="outlined"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isFetching}
              style={{ flexGrow: 1, marginRight: "10px" }}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
