import React, { useState } from "react";
import { Stack, Fade } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

import AuthWrapper from "@/components/AuthWrapper";
import DogBreedSelector from "@/components/DogBreedSelector";
import useSmall from "@/Hooks/useSmall";

import { IDogBreed } from "@/models";

export default function Adopted() {
  const small = useSmall(600);

  const [selectedBreed, setSelectedBreed] = useState<IDogBreed | undefined>(
    undefined
  );
  const [titleRendered, setTitleRendered] = useState<boolean>(false);
  const [messageRendered, setMessageRendered] = useState<boolean>(false);

  return (
    <AuthWrapper>
      <Stack sx={{ p: "3em" }} spacing={2}>
        <TypeAnimation
          wrapper="div"
          style={{ fontSize: "2rem", fontWeight: 600 }}
          sequence={["Newly Owned Stage", 1000, () => setTitleRendered(true)]}
          cursor={false}
        />
        {titleRendered && (
          <TypeAnimation
            wrapper="div"
            style={{ fontSize: "1rem", fontWeight: 400 }}
            sequence={[
              "Congratulations on your new four-legged friend! We're here to guide you through the exciting and sometimes challenging early days of dog ownership. From understanding your dog's needs to essential care tips, we've got you covered!",
              1000,
              () => setMessageRendered(true),
            ]}
            speed={70}
          />
        )}
        {messageRendered && (
          <Fade in={messageRendered}>
            <div>
              <DogBreedSelector
                question="Which dog have you adopted?"
                selectedBreed={selectedBreed ? selectedBreed.breed : ""}
                breedSelect={setSelectedBreed}
              />
            </div>
          </Fade>
        )}
      </Stack>
    </AuthWrapper>
  );
}
