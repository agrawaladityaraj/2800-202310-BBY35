import { Typography, Button, ButtonGroup, Box, Stack } from "@mui/material";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DogGif from "@/assets/images/dog.gif";
import styles from "/styles/Homepage.module.css";

import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PetsIcon from "@mui/icons-material/Pets";
import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from '@mui/styles';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(154, 233, 64) 0%,rgb(205, 233, 64) 70%,rgb(233, 179, 64) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(154, 233, 64) 0%,rgb(205, 233, 64) 70%,rgb(233, 179, 64) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);


const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 95deg,rgb(154, 233, 64) 0%,rgb(205, 233, 64) 70%,rgb(233, 179, 64) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 95deg,rgb(154, 233, 64) 0%,rgb(205, 233, 64) 70%,rgb(233, 179, 64) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PsychologyAltIcon />,
    2: <PetsIcon />,
    3: <SchoolIcon />,
    4: <VolunteerActivismIcon/>
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


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
  const [activeStep, setActiveStep] = useState(0);
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepsContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <div>
          <h3>There's a lot to think about before getting a dog! Let me know if you have any questions.</h3>
          <Button component={Link} href="/chat" variant="contained" color="primary">
            Ask me questions here!
          </Button>
          </div>
        );
      case 1:
        return (
          <div>
            <h3>Tell me more about which dog you've chosen!</h3>
            <Button component={Link} href="/add_dog" variant="contained" color="primary">
              Enter your dog's information here
            </Button>
          </div>
        );
      case 2:
        return (
          <div>
          <h3>Training your dog is important to keep them and other people safe.</h3>
          <Button component={Link} href="/ai" variant="contained" color="primary">
              See more training
          </Button>
          </div>
        );
      case 3: 
      return(
        <div>
        <h3>Stay up to date on your dog's health!</h3>
          <Button component={Link} href="/user_profile" variant="contained" color="primary">
              View your dog's profile
          </Button>
        </div>
      )
    }
  }

  function getSteps() {
    return ["Thinking about getting a dog", "Choose a dog", "Train your dog", "Care for your dog"];
  }
  const steps = getSteps();

  return (
    <>
      <Box paddingBottom={25} display="flex" alignItems="center" justifyContent="center">
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

      <div>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                onClick={() => setActiveStep(index)}
                StepIconComponent={ColorlibStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <br />

      <div>
        {getStepsContent(activeStep)}

        {/* {active === 2 ? () : null} */}
        {activeStep === steps.length ? (
          "Enjoy your time with your dog!"
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
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
              >
                Next
                {activeStep === 0}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
