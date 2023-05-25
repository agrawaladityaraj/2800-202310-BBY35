import { IExercise } from "./IExercise";

export interface ILessonsRequest {
  age: string; // how old is the dog
  breed: string; // what breed is the dog
  energy: string; // what is the dogs energy level like
  behaviour: string; // what is the dog's behaviour like
  motivation: string; // what motivates the dog to learn
  numberOfLessons: number; // number of lessons the owner wants
  ownerGoals: string; // what does the owner want to achieve
}

export interface ILessonExerciseDetails {
  lessonName: string; // name of the lesson (focus, recall, loose lead walking, etc.)
  lessonObjectives: string[]; // what the lesson will cover
  lessonReason: string; // why the lesson is important for that dog
}

export interface ILessonResponse {
  lessons: ILessonExerciseDetails[]; // list of lessons that will be generated
}

export interface ILesson {
  dogId: string;
  id: string;
  lessonName: string; // name of the lesson (focus, recall, loose lead walking, etc.)
  lessonObjectives: string[]; // what the lesson will cover
  lessonReason: string; // why the lesson is important for that dog
  exercises: IExercise[];
}
