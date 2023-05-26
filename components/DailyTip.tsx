import { useState, useEffect } from "react";
import { Box, Typography, Button, Dialog, DialogContent } from "@mui/material";
import type { IChatGPTMessage } from "@/models/index";

export default function ChatComponent() {
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<IChatGPTMessage[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    const data = await response.json();
    const message: IChatGPTMessage = data;
    setValue("");
    setConversation([...chatHistory, message]);
    handleOpen();
  };

  useEffect(() => {
    localStorage.setItem("buttonDisabled", JSON.stringify(buttonDisabled));
  }, [buttonDisabled]);

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={sendMessage}
          disabled={buttonDisabled}
        >
          Tip of the Day!
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            {conversation.map((item, index) => {
              if (item.role === "user") return null;
              return (
                <div key={index}>
                  <Typography variant="body1">{item.content}</Typography>
                </div>
              );
            })}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
