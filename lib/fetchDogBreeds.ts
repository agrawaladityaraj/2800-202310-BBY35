import axios from "axios";

import { IDogBreed } from "@/models";

const seperateStrings = (input: string): string[] => {
  return input.split(",").map((item: string) => item.trim().toLowerCase());
};

const seperateNumbers = (input: string): { min: number; max: number } => {
  const splits = input.split("-");
  return { min: parseInt(splits[0]), max: parseInt(splits[1]) };
};

export default async function fetchDogBreeds() {
  const { data } = await axios.get("/api/fetchdogbreeds");
  const breeds: IDogBreed[] = data.map(
    ({
      id,
      breed,
      countryOfOrigin,
      furColor,
      heightIn,
      colorOfEyes,
      longevityYrs,
      characterTraits,
      commonHealthProblems,
    }: any) => ({
      id,
      breed,
      countryOfOrigin,
      furColor: seperateStrings(furColor),
      minHeight: seperateNumbers(heightIn).min,
      maxHeight: seperateNumbers(heightIn).max,
      colorOfEyes,
      minLongevity: seperateNumbers(longevityYrs).min,
      maxLongevity: seperateNumbers(longevityYrs).max,
      characterTraits: seperateStrings(characterTraits),
      commonHealthProblems: seperateStrings(commonHealthProblems),
    })
  );
  return breeds;
}
