import React from "react";

import AddDog from "@/components/AddDog";

export default function Adopted() {
  return (
    <AddDog
      stageNumber={1}
      stageName="Newly Owned Stage"
      stageContent="Congratulations on your new four-legged friend! We're here to guide you through the exciting and sometimes challenging early days of dog ownership. From understanding your dog's needs to essential care tips, we've got you covered!"
      question="Which dog have you adopted?"
    />
  );
}
