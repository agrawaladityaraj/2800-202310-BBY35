import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Stepper } from "@mantine/core";

import AuthWrapper from "@/components/AuthWrapper";
import StyledStepper from "@/components/StyledStepper";
import useSmall from "@/Hooks/useSmall";

interface IStep {
  label: string;
  description: string;
  child: JSX.Element;
}

const steps: IStep[] = [
  { label: "Curious", description: "Thinking about a dog", child: <div></div> },
  { label: "Adopted", description: "Just got a dog", child: <div></div> },
  {
    label: "Training",
    description: "Trying to train my dog",
    child: <div></div>,
  },
  { label: "Health", description: "Caring for my dog", child: <div></div> },
];

export default function AddDog() {
  const small = useSmall(1000);

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <AuthWrapper>
      <Container sx={{ p: small ? 0 : "2em" }}>
        <StyledStepper
          active={activeStep}
          onStepClick={(index: number) => setActiveStep(index)}
          orientation={small ? "vertical" : "horizontal"}
          size={small ? "sm" : "md"}
        >
          {steps.map((step: IStep) => (
            <Stepper.Step
              key={step.label}
              label={step.label}
              description={step.description}
            >
              {step.child}
            </Stepper.Step>
          ))}
        </StyledStepper>
      </Container>
    </AuthWrapper>
  );
}
