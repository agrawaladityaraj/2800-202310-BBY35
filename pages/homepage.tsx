import { Button, Typography, Box, Stack } from "@mui/material";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DogGif from "@/assets/images/dog.gif";
import styles from "/styles/Homepage.module.css";
import { Title } from "@mantine/core";

import JourneyStepper from "@/components/JourneyStepper";
import useSmall from "@/Hooks/useSmall";
import DailyTip from "@/components/DailyTip";

export default function HomeButtons() {
  const small = useSmall(1000);
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
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepsContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <div
              style={{
                width: "80%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Title order={4}>
                {
                  "There's a lot to think about before getting a dog! Let me know if you have any questions."
                }
              </Title>
              <Button
                component={Link}
                href="/recommendation"
                variant="contained"
                color="secondary"
                style={{ marginTop: "1em" }}
              >
                Find a dog here!
              </Button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div
              style={{
                width: "80%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Title order={4}>
                {"Tell me more about which dog you've chosen!"}
              </Title>
              <Button
                component={Link}
                href="/add_dog/adopted"
                variant="contained"
                color="secondary"
                style={{ marginTop: "1em" }}
              >
                {"Enter your dog's information here"}
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div
              style={{
                width: "80%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Title order={4}>
                {
                  "Training your dog is important to keep them and other people safe."
                }
              </Title>
              <Button
                component={Link}
                href="/add_dog/training"
                variant="contained"
                color="secondary"
                style={{ marginTop: "1em" }}
              >
                {"See more training"}
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div
              style={{
                width: "80%",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Title order={4}>{"Stay up to date on your dog's health!"}</Title>
              <Button
                component={Link}
                href="/dog"
                variant="contained"
                color="secondary"
                style={{ marginTop: "1em" }}
              >
                {"View your dog's profile"}
              </Button>
            </div>
          </>
        );
    }
  }

  function getSteps() {
    return [
      "Thinking about getting a dog",
      "Choose a dog",
      "Train your dog",
      "Care for your dog",
    ];
  }
  const steps = getSteps();

  return (
    <>
      <Box
        paddingBottom={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box width="80%">
          <JourneyStepper
            activeStep={activeStep}
            onStepClick={(index: number) => setActiveStep(index)}
            small={small}
            showCard={false}
          />
        </Box>
      </div>
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box width="80%">
          {getStepsContent(activeStep)}
          <div style={{ marginTop: "1em" }}>
            <DailyTip />
          </div>
        </Box>
      </div>
    </>
  );
}
