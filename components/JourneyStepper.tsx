import React from "react";
import { Stepper } from "@mantine/core";

import StyledStepper from "@/components/StyledStepper";
import JourneyStep from "@/components/JourneyStep";

interface IStep {
  label: string;
  description: string;
  child: JSX.Element;
}

const steps: IStep[] = [
  {
    label: "Curious",
    description: "Thinking about a dog",
    child: (
      <JourneyStep
        title="Curiosity Stage"
        content="Hey there future pup parent! 🐾 Feeling the puppy love but not sure where to start? Don't worry, we've got you! Let's embark on a tail-wagging adventure to discover your dream dog breed. By understanding your lifestyle, preferences, and quirks, we'll make sure to find a furry match that's paw-sitively perfect! 🐶"
        link="/add_dog/curious"
        button="Sniff Out My Perfect Pup!"
      />
    ),
  },
  {
    label: "Adopted",
    description: "Just got a dog",
    child: (
      <JourneyStep
        title="Newly Owned Stage"
        content="Hip hip hooray! 🎉 You've got a new paw-tner in crime. Welcome to the wildly wonderful world of dog ownership! Get ready for belly rubs, endless games of fetch, and yes, even those infamous puppy dog eyes. We're here to help you navigate these exciting times. From understanding your pup's unique needs to setting up a cozy corner, we'll make sure you're fully pre-pawed! 🦴"
        link="/add_dog/adopted"
        button="Start Pup Parenting!"
      />
    ),
  },
  {
    label: "Training",
    description: "Trying to train my dog",
    child: (
      <JourneyStep
        title="Training Stage"
        content="Ready to teach your dog some pawsome tricks? 🎓 Unleash your inner dog whisperer as we guide you through the exciting journey of dog training. Remember, every 'sit', 'stay', and 'paw' is a paw-sitive step towards a well-behaved furry friend. Let's roll over to our training resources and get your pup's tail wagging with excitement! 🐕‍🦺"
        link="/add_dog/training"
        button="Turn Barks into Tricks!"
      />
    ),
  },
  {
    label: "Health",
    description: "Caring for my dog",
    child: (
      <JourneyStep
        title="Health Maintenance Stage"
        content="Want to keep your dog's tail wagging with health and happiness? 🌈 You've come to the right place! Let's deep-dive into the world of doggy diets, exercise routines, and preventive care. Because when it comes to your dog's health, every little bit counts. Let's fetch some great tips together to keep your pup feeling pawsitively vibrant! 🍎"
        link="/add_dog/health"
        button="Let's Keep the Tail Wagging!"
      />
    ),
  },
];

interface IProps {
  activeStep: number;
  onStepClick: (index: number) => void;
  small: boolean;
  showCard: boolean;
}

export default function JourneyStepper({
  activeStep,
  onStepClick,
  small,
  showCard,
}: IProps) {
  return (
    <StyledStepper
      active={activeStep}
      onStepClick={onStepClick}
      orientation={small ? "vertical" : "horizontal"}
      size={small ? "sm" : "md"}
    >
      {steps.map((step: IStep) => (
        <Stepper.Step
          key={step.label}
          label={step.label}
          description={step.description}
        >
          {showCard && step.child}
        </Stepper.Step>
      ))}
    </StyledStepper>
  );
}
