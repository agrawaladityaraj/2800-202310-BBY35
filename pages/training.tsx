import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ChatComponent from "@/components/ChatComponent";
import {
  ILessonsRequest,
  ILessonExerciseDetails,
  IExerciseResponse,
  IExerciseRequest,
} from "@/models";

export default function Trial() {
  const [trainingInfo, setTrainingInfo] = useState<ILessonsRequest>({
    age: "",
    breed: "",
    energy: "",
    behaviour: "",
    motivation: "",
    numberOfLessons: 0,
    ownerGoals: "",
  });
  const [selectedLesson, setSelectedLesson] =
    useState<ILessonExerciseDetails | null>(null);

  const [exerciseResult, setExerciseResult] =
    useState<IExerciseResponse | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedLesson) {
        const exerciseRequest: IExerciseRequest = {
          ...trainingInfo,
          lesson: selectedLesson,
        };

        try {
          const response = await fetch("/api/openai/generateExercises", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ exerciseInfo: exerciseRequest }),
          });

          const data = await response.json();
          if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          setExerciseResult(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchExercises();
  }, [selectedLesson]);

  const handleGenerateClick = (lesson: ILessonExerciseDetails) => {
    setSelectedLesson(lesson);
  };

  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTrainingInfo((prevTrainingInfo: any) => ({
      ...prevTrainingInfo,
      [name]: value,
    }));
  };

  const handleLessonSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/openai/generateLessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainingInfo),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ChatComponent />
      <Box component="form" onSubmit={handleLessonSubmit} autoComplete="off">
        <Typography variant="h5">Training Request Form</Typography>

        <TextField
          name="age"
          label="Age"
          variant="outlined"
          value={trainingInfo.age}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="breed"
          label="Breed"
          variant="outlined"
          value={trainingInfo.breed}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="energy"
          label="Energy"
          variant="outlined"
          value={trainingInfo.energy}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="behaviour"
          label="Behaviour"
          variant="outlined"
          value={trainingInfo.behaviour}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="motivation"
          label="Motivation"
          variant="outlined"
          value={trainingInfo.motivation}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="numberOfLessons"
          label="Number of Lessons"
          variant="outlined"
          value={trainingInfo.numberOfLessons}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          name="ownerGoals"
          label="Owner Goals"
          variant="outlined"
          value={trainingInfo.ownerGoals}
          onChange={handleChange}
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>

      {result && (
        <Box>
          <Typography variant="h6">
            Lessons generated: {result.lessons?.length}
          </Typography>

          {result.lessons?.map((lesson: any, index: number) => (
            <Card key={index} variant="outlined" style={{ margin: "10px 0" }}>
              <CardContent>
                <Typography variant="h6">{lesson.lessonName}</Typography>
                <Typography variant="body1">Objectives:</Typography>
                {lesson.lessonObjectives.map((objective, objIndex) => (
                  <Typography key={objIndex} variant="body1">
                    {`Objective ${objIndex + 1}: ${objective}`}
                  </Typography>
                ))}
                <Typography variant="body2">{`Reason: ${lesson.lessonReason}`}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleGenerateClick(lesson)}
                >
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {exerciseResult && (
        <Box>
          <Typography variant="h6">
            Exercises for {selectedLesson?.lessonName}:
          </Typography>

          {exerciseResult.exercises?.map((exercise, index) => (
            <Card key={index} variant="outlined" style={{ margin: "10px 0" }}>
              <CardContent>
                <Typography variant="h6">{exercise.name}</Typography>
                <Typography variant="body2">
                  {`Steps: `}
                  {exercise.steps.map((step, stepIndex) => (
                    <div key={stepIndex}>
                      {`Step ${stepIndex + 1}: ${step}`}
                    </div>
                  ))}
                </Typography>
                <Typography variant="body2">
                  {`Tips: `}
                  {exercise.tips.map((tip, tipIndex) => (
                    <div key={tipIndex}>{`Tip ${tipIndex + 1}: ${tip}`}</div>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}
