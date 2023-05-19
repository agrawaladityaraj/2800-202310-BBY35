import { Typography, Button, ButtonGroup, Box, Stack } from "@mui/material";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DogGif from "@/assets/images/dog.gif";
import styles from "/styles/Homepage.module.css";

const buttons = [
  <Button key="one">Recommend a Dog</Button>,
  <Button key="two">Browse Dog Breeds</Button>,
  <Button key="three">New Dog</Button>,
];

const buttons2 = [
  <Button key="one">About Us</Button>,
  <Button key="two">Contact</Button>,
];

export default function HomeButtons() {
  const [clickCount, setclickCount] = useState(0);
  const [showDog, setShowDog] = useState(false);

  const handleLogoClick = () => {
    if (clickCount >= 3) {
      //resetting the click count and show the dog animation
      setclickCount(0);
      setShowDog(true);

      //hide the dog animation after 5 seconds
      setTimeout(() => {
        setShowDog(false);
      }, 810);
    } else {
      //incrementing the click count
      setclickCount(clickCount + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          my: 1,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h3"
          component="h3"
          style={{ fontWeight: "bold", marginRight: "1em" }}
        >
          IntelliPaws
        </Typography>
        <Image
          src={Logo}
          height={100}
          width={100}
          alt="Logo"
          onClick={handleLogoClick}
        />
        {showDog && (
          <div className={styles["dog-animation"]}>
            <Image
              src={DogGif}
              priority={true}
              fill
              style={{ objectFit: "cover" }}
              alt="Dog Licking Screen"
            />
          </div>
        )}
      </Box>

      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        color="secondary"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          component="h5"
          style={{ fontWeight: "bold", marginRight: "1em" }}
        >
          Information
        </Typography>
      </Box>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        color="secondary"
        variant="contained"
      >
        {buttons2}
      </ButtonGroup>
    </Box>
  );
}
