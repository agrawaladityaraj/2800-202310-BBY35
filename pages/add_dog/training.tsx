import React from "react";

import AddDog from "@/components/AddDog";

export default function Adopted() {
  return (
    <AddDog
      stageNumber={2}
      stageName="Training Stage"
      stageContent="Training your dog can be a rewarding journey for both of you, strengthening your bond and ensuring harmonious living. From basic commands to advanced tricks, we have a wealth of resources to make training an enjoyable experience. Let's help your pup become the best they can be!"
      question="Which dog are you looking to train?"
    />
  );
}
