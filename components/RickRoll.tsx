import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  small: boolean;
}

export default function RickRoll({ open, setOpen, small }: IProps) {
  const style = {
    position: "absolute" as "absolute",
    top: small ? "50%" : "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "transparent",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
    p: "2vw",
    height: "100vh",
    width: "100vw",
    maxWidth: "700px",
    maxHeight: "363px",
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box>
        <Box sx={style}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/xvFZjo5PgG0?frameborder=0&autoplay=1"
            title="Rick Roll"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Box>
      </Box>
    </Modal>
  );
}
