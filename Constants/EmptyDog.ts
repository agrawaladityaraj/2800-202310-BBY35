import { IDog } from "@/models";

import Constants from "@/Constants";

const EmptyDog: IDog = {
  id: "",
  name: "",
  birthDate: new Date(Date.now()),
  breedId: "",
  pictureUrl: "",
  breed: {
    breed: "",
    characterTraits: [],
    colorOfEyes: "",
    commonHealthProblems: [],
    countryOfOrigin: "",
    furColor: [],
    minHeight: 0,
    maxHeight: 0,
    id: "",
    minLongevity: 0,
    maxLongevity: 0,
  },
};

export default EmptyDog;
