import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { useState } from "react";

interface Exercise {
  exercise_name: string;
  steps: string[];
  duration_minutes: number;
}

interface ExercisePageProps {
  exerciseData: {
    skill_name: string;
    objectives: string[];
    exercises: Exercise[];
  };
}

export const ExerciseComponent: React.FC<ExercisePageProps> = ({
  exerciseData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const handleOpen = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExercise(null);
  };

  return (
    <Container
      sx={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{exerciseData.skill_name}</h1>
      <Grid container spacing={2} justifyContent="center">
        {exerciseData.exercises.map((exercise, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              onClick={() => handleOpen(exercise)}
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  color: "#000",
                },
              }}
            >
              {exercise.exercise_name}
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedExercise && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>{selectedExercise.exercise_name}</DialogTitle>
          <DialogContent>
            <h3>Steps:</h3>
            <ol>
              {selectedExercise.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <Box mt={2}>
              <strong>Estimated time:</strong>{" "}
              {selectedExercise.duration_minutes} minutes
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};
