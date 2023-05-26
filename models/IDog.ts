import { IDogBreed } from "@/models";

export interface IDog {
  id: string;
  name: string;
  birthDate: Date;
  breedId: string;
  pictureUrl: string;
  breed: IDogBreed;
  generatingLessons: boolean;
}
