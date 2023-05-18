import React, { useState, useEffect } from "react";
import { Select } from "@mantine/core";

import fetchDogBreeds from "@/lib/fetchDogBreeds";

import { IDogBreed } from "@/models";

interface IProps {
  question: string;
  selectedBreed: string;
  breedSelect: (breed: IDogBreed | undefined) => void;
  breedError: string;
}

export default function DogInformation({
  question,
  selectedBreed,
  breedSelect,
  breedError,
}: IProps) {
  const [dogBreeds, setDogBreeds] = useState<IDogBreed[]>([]);

  useEffect(() => {
    (async () => {
      setDogBreeds(await fetchDogBreeds());
    })();
  }, []);

  return (
    <Select
      label={question}
      placeholder="Select your adopted dog's breed from the list below!"
      data={dogBreeds.map((breed: IDogBreed) => ({
        label: breed.breed,
        value: breed.breed,
      }))}
      searchable
      maxDropdownHeight={400}
      nothingFound="Uh-oh, seems like those dog breeds are on vacation!"
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) || false
      }
      value={selectedBreed}
      onChange={(value) => {
        breedSelect(
          dogBreeds.find((breed: IDogBreed) => breed.breed === value)
        );
      }}
      error={breedError ?? false}
    />
  );
}
