import { ILessonExerciseDetails } from "./ILesson";

export type IExerciseRequest = {
  age: string; // how old is the dog
  breed: string; // what breed is the dog
  energy: string; // what is the dogs energy level like
  behaviour: string; // what is the dog's behaviour like
  motivation: string; // what motivates the dog to learn
  lesson: ILessonExerciseDetails; // name of the lesson (focus, recall, loose lead walking, etc.)
};

export type IExercise = {
  name: string; // name of the exercise
  goal: string; // what the exercise is trying to achieve
  steps: string[]; // steps to complete the exercise
  tips: string[]; // tips to help complete the exercise
};

export type IExerciseResponse = {
  exercises: IExercise[]; // list of exercises that will be generated
};
