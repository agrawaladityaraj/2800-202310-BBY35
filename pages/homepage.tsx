import { Typography, Button, ButtonGroup, Box, Stack } from "@mui/material";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DogGif from "@/assets/images/dog.gif";
import styles from "/styles/Homepage.module.css";

import JourneyStepper from "@/components/JourneyStepper";
import useSmall from "@/Hooks/useSmall";
import DailyTip from "@/components/DailyTip";
import ChatComponent from "@/components/ChatComponent";

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
            <div style={{ width: "80%", justifyContent: "center", flexDirection: "column" }}>
              <h3>
                {
                  "There's a lot to think about before getting a dog! Let me know if you have any questions."
                }
              </h3>
              <Button
                component={Link}
                href="/chat"
                variant="contained"
                color="primary"
              >
                Ask me questions here!
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
              <h3>{"Tell me more about which dog you've chosen!"}</h3>
              <Button
                component={Link}
                href="/dog"
                variant="contained"
                color="primary"
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
              <h3>
                {
                  "Training your dog is important to keep them and other people safe."
                }
              </h3>
              <Button
                component={Link}
                href="/lessons"
                variant="contained"
                color="primary"
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
              <h3>{"Stay up to date on your dog's health!"}</h3>
              <Button
                component={Link}
                href="/user_profile"
                variant="contained"
                color="primary"
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
        {getStepsContent(activeStep)}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ paddingTop: "25px",flexDirection: "column", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === 3}
          >
            Next
            {activeStep === 0}
          </Button>
          <div>
            <DailyTip />
          </div>
        </div>
      </div>
    </>
  );
}
