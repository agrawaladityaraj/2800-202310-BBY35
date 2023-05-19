import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Stack, Fade } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

import AuthWrapper from "@/components/AuthWrapper";
import JourneyStepper from "./JourneyStepper";
import DogInformation from "@/components/DogInformation";
import Context from "@/Context/Context";
import useSmall from "@/Hooks/useSmall";

import { IDogBreed, IContext } from "@/models";

interface ITextField {
  value: string;
  error: string;
}

const characteristicsToString = (characteristics: string[]): string => {
  let ret = "";
  characteristics.forEach((characteristic: string, index: number) => {
    if (index === characteristics.length - 2) ret += characteristic + " and ";
    else if (index === characteristics.length - 1) ret += characteristic + "!";
    else ret += characteristic + ", ";
  });
  return ret;
};

interface IProps {
  stageNumber: number;
  stageName: string;
  stageContent: string;
  question: string;
}

export default function AddDog({
  stageNumber,
  stageName,
  stageContent,
  question,
}: IProps) {
  const { push } = useRouter();
  const small = useSmall(800);
  const { user }: IContext = useContext(Context);

  const [selectedBreed, setSelectedBreed] = useState<IDogBreed | undefined>(
    undefined
  );
  const [breedError, setBreedError] = useState<string>("");
  const [titleRendered, setTitleRendered] = useState<boolean>(false);
  const [messageRendered, setMessageRendered] = useState<boolean>(false);
  const [breedSelected, setBreedSelected] = useState<boolean>(false);
  const [characteristicsRendered, setCharacteristicsRendered] =
    useState<boolean>(false);
  const [dogName, setDogName] = useState<ITextField>({ value: "", error: "" });
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(Date.now()));
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedBreed) {
      setBreedError("Breed is required!");
    }
    if (!dogName.value) {
      setDogName({ value: "", error: "Name is required!" });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/dog/add", {
        stage: 1,
        name: dogName.value,
        birthDate: dateOfBirth,
        breedId: selectedBreed?.id,
        ownerId: user.id,
      });
      push(`/dog/${res.data.id}`);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBreedSelected(false);
    setCharacteristicsRendered(false);
    setTimeout(() => {
      setBreedSelected(selectedBreed ? true : false);
    }, 1000);
  }, [selectedBreed]);

  return (
    <AuthWrapper>
      <Stack sx={{ p: "2.5em", pt: "1em" }} spacing={2}>
        <JourneyStepper
          activeStep={stageNumber}
          onStepClick={(_: number) => {}}
          small={small}
          showCard={false}
        />
        <TypeAnimation
          wrapper="div"
          style={{
            fontSize: small ? "1.5rem" : "2rem",
            fontWeight: 600,
            paddingTop: small ? 0 : "1em",
          }}
          sequence={[stageName, 1000, () => setTitleRendered(true)]}
          cursor={false}
        />
        {titleRendered && (
          <TypeAnimation
            wrapper="div"
            style={{ fontSize: small ? "0.9rem" : "1rem", fontWeight: 400 }}
            sequence={[stageContent, 1000, () => setMessageRendered(true)]}
            speed={72}
          />
        )}
        {messageRendered && (
          <Fade in={messageRendered}>
            <div>
              <DogInformation
                question={question}
                selectedBreed={selectedBreed ? selectedBreed.breed : ""}
                breedSelect={(breed) => {
                  setSelectedBreed(breed);
                  setBreedError("");
                }}
                breedError={breedError}
              />
            </div>
          </Fade>
        )}
        {breedSelected && selectedBreed && (
          <TypeAnimation
            wrapper="div"
            style={{ fontSize: small ? "0.9rem" : "1rem", fontWeight: 400 }}
            sequence={[
              `Good Choice! ${
                selectedBreed.breed
              } are ${characteristicsToString(selectedBreed.characterTraits)}`,
              1000,
              () => setCharacteristicsRendered(true),
            ]}
            speed={50}
          />
        )}
        {characteristicsRendered && (
          <Fade in={characteristicsRendered}>
            <Stack spacing={2}>
              <TextInput
                id="name"
                label="Dog Name"
                name="name"
                placeholder="What's your dog's name?"
                value={dogName.value}
                error={dogName.error ? dogName.error : false}
                onChange={(e: any) =>
                  setDogName({ error: "", value: e.target.value })
                }
              />
              <DateInput
                id="dateOfBirth"
                label="Date of Birth"
                name="dateOfBirth"
                placeholder="What's the paw-some pup's birthdate"
                value={dateOfBirth}
                onChange={(value) => {
                  if (value) {
                    setDateOfBirth(value);
                  }
                }}
                mx="auto"
              />
              <LoadingButton
                variant="contained"
                color="secondary"
                disableElevation
                loading={loading}
                size="small"
                fullWidth
                onClick={handleSubmit}
                sx={{ maxWidth: "400px", alignSelf: "center" }}
              >
                Add Dog
              </LoadingButton>
            </Stack>
          </Fade>
        )}
      </Stack>
    </AuthWrapper>
  );
}
