import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Stack, Select, Title, MultiSelect, Button } from "@mantine/core";

import AuthWrapper from "@/components/AuthWrapper";

import Context from "@/Context/Context";
import Constants from "@/Constants";

import { IContext, IDog } from "@/models";

interface ITextField {
  value: string;
  error: string;
}

interface IMultiTextField {
  value: string[];
  error: string;
}

export default function GenerateDogLesson() {
  const router = useRouter();
  const { id } = router.query;
  const { user, setAlert }: IContext = useContext(Context);

  const [dog, setDog] = useState<IDog>(Constants.EmptyDog);
  const [areaOfFocus, setAreaOfFocus] = useState<ITextField>({
    value: "",
    error: "",
  });
  const [energyLevel, setEnergyLevel] = useState<ITextField>({
    value: "",
    error: "",
  });
  const [behaviour, setBehaviour] = useState<IMultiTextField>({
    value: [],
    error: "",
  });
  const [motivators, setMotivators] = useState<IMultiTextField>({
    value: [],
    error: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      let error: boolean = false;
      if (!dog.id.length) {
        setAlert({ open: true, payload: "Dog not found!", severity: "error" });
        return;
      }
      if (!areaOfFocus.value) {
        setAreaOfFocus({ ...areaOfFocus, error: "Area of focus is required!" });
        error = true;
      }
      if (!energyLevel.value) {
        setEnergyLevel({ ...energyLevel, error: "Energy level is required!" });
        error = true;
      }
      if (!behaviour.value.length) {
        setBehaviour({ ...behaviour, error: "Select at least one behaviour!" });
        error = true;
      }
      if (!motivators.value.length) {
        setMotivators({
          ...motivators,
          error: "Select at least one motivator!",
        });
        error = true;
      }
      if (error) {
        return;
      }
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setAlert({
        open: true,
        payload: "Something went wrong! Try again",
        severity: "error",
      });
    }
  };

  const fetchDogData = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/dog/${userId}`);
      const selectedDog = data.find((dg: IDog) => dg.id === id);
      if (selectedDog) {
        setDog(selectedDog);
      } else {
        setAlert({ open: true, payload: "Dog not found!", severity: "error" });
      }
    } catch (error) {
      setAlert({ open: true, payload: "Dog not found!", severity: "error" });
    }
  };

  useEffect(() => {
    if (user.id && id) {
      (async () => {
        await fetchDogData(user.id);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  return (
    <AuthWrapper>
      <Stack sx={{ padding: "4vw" }} spacing={3}>
        <Title sx={{ marginBottom: "0.45em" }} order={3}>
          Generate Lesson for {dog.name}, the {dog.breed.breed}
        </Title>
        <Select
          label="Area of focus"
          placeholder="What would you like the exercises to achieve?"
          data={[
            { label: "Agility", value: "Agility" },
            { label: "Obedience", value: "Obedience" },
            { label: "Tracking", value: "Tracking" },
          ]}
          value={areaOfFocus.value}
          onChange={(value) =>
            setAreaOfFocus({ value: value ?? "", error: "" })
          }
          error={areaOfFocus.error ?? false}
        />
        <Select
          label="Energy Level"
          placeholder="How energetic is your dog?"
          data={[
            { label: "Very Low Energy", value: "Very Low Energy" },
            { label: "Low Energy", value: "Low Energy" },
            { label: "Moderate Energy", value: "Moderate Energy" },
            { label: "High Energy", value: "High Energy" },
            { label: "Very High Energy", value: "Very High Energy" },
          ]}
          value={energyLevel.value}
          onChange={(value) =>
            setEnergyLevel({ value: value ?? "", error: "" })
          }
          error={energyLevel.error ?? false}
        />
        <MultiSelect
          label="Behaviour"
          placeholder="How is your dog behaving?"
          value={behaviour.value}
          onChange={(value) => setBehaviour({ value, error: "" })}
          error={behaviour.error ?? false}
          data={Constants.DogBehaviours}
        />
        <MultiSelect
          label="Motivators"
          placeholder="What motivates your dog?"
          value={motivators.value}
          onChange={(value) => setMotivators({ value, error: "" })}
          error={motivators.error ?? false}
          data={[
            { label: "Food Rewards", value: "Food Rewards" },
            { label: "Play & Toys", value: "Play & Toys" },
            { label: "Praise & Affection", value: "Praise & Affection" },
            { label: "Physical Touch", value: "Physical Touch" },
            { label: "Social Interaction", value: "Social Interaction" },
            {
              label: "Positive Reinforcement",
              value: "Positive Reinforcement",
            },
          ]}
        />
        <Button onClick={handleSubmit} size="sm" sx={{ marginTop: "0.5em" }}>
          Generate
        </Button>
      </Stack>
    </AuthWrapper>
  );
}
