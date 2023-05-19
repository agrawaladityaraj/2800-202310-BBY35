import React from "react";
import Link from "next/link";
import { Typography, Button, ButtonGroup, Box } from "@mui/material";

const buttons = [
  <Button component={Link} href="/exercise" key="one">
    Lesson 1 - Focus
  </Button>,
  <Button component={Link} href="/training" key="two">
    Lesson 2 - Walking
  </Button>,
  <Button component={Link} href="/training" key="three">
    Lesson 3 - Control
  </Button>,
];

export default function Training() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="h3"
        component="h3"
        style={{ fontWeight: "bold", marginBottom: "1em" }}
      >
        LESSONS
      </Typography>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        color="secondary"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
