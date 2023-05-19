import React from "react";

import AddDog from "@/components/AddDog";

export default function Adopted() {
  return (
    <AddDog
      stageNumber={3}
      stageName="Health Maintenance Stage"
      stageContent="A healthy dog is a happy dog! We're here to help you navigate through the world of your dog's health and wellness. From diet tips to exercise routines and preventive care, our resources will guide you towards maintaining your dog's optimal health. Because we know, their well-being is your priority!"
      question="What is the bog's breed?"
    />
  );
}
