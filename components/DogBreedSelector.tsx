import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { Select, Title } from "@mantine/core";

import fetchDogBreeds from "@/lib/fetchDogBreeds";

import { IDogBreed } from "@/models";

interface IProps {
  question: string;
  selectedBreed: string;
  breedSelect: (breed: IDogBreed | undefined) => void;
}

export default function DogBreedSelector({
  question,
  selectedBreed,
  breedSelect,
}: IProps) {
  const [dogBreeds, setDogBreeds] = useState<IDogBreed[]>([]);

  useEffect(() => {
    (async () => {
      setDogBreeds(await fetchDogBreeds());
    })();
  }, []);

  return (
    <Stack sx={{ p: "2em" }} spacing={2}>
      <Title order={2}>{question}</Title>
      <Select
        placeholder="Search"
        data={dogBreeds.map((breed: IDogBreed) => ({
          label: breed.breed,
          value: breed.breed,
        }))}
        searchable
        maxDropdownHeight={400}
        nothingFound="Uh-oh, seems like those dog breeds are on vacation!"
        filter={(value, item) =>
          item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          false
        }
        value={selectedBreed}
        onChange={(value) => {
          breedSelect(
            dogBreeds.find((breed: IDogBreed) => breed.breed === value)
          );
        }}
      />
    </Stack>
  );
}
