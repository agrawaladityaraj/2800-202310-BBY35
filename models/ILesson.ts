export type IExercise = {
  name: string;
  goal: string;
  steps: string[];
  tips: string[];
};

export type ILessonResponse = {
  lessonName: string;
  lessonGoal: string;
  lessonFocus: string;
  lessonObjectives: string[];
  exercises: IExercise[];
};

export type ILessonRequest = {
  age: string;
  breed: string;
  energy: string;
  behaviour: string;
  motavation: string;
  focus: string;
  avoidExercises: string[];
};
