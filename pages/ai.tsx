import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ILessonRequest, ILessonResponse } from "@/models/index";

export default function MyForm() {
  const [lessonInfo, setLessonInfo] = useState<ILessonRequest>({
    focus: "",
    breed: "",
    age: "",
    energy: "",
    behaviour: "",
    motavation: "",
    avoidExercises: [],
  });
  const [result, setResult] = useState<ILessonResponse | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLessonInfo((prevLessonInfo) => ({
      ...prevLessonInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generateLesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lessonInfo }),
      });
      const data: ILessonResponse = await response.json();
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMultiSelectChange = (e: any) => {
    const { name, value } = e.target;
    setLessonInfo((prevLessonInfo) => ({
      ...prevLessonInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Area of Focus</InputLabel>
          <Select
            name="focus"
            value={lessonInfo.focus}
            onChange={handleChange}
            required
          >
            <MenuItem value="Agility">Agility</MenuItem>
            <MenuItem value="Obedience">Obedience</MenuItem>
            <MenuItem value="Tracking">Tracking</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="breed"
          label="Dog Breed"
          value={lessonInfo.breed}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="age"
          label="Dog Age"
          value={lessonInfo.age}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="energy"
          label="Energy Level"
          value={lessonInfo.energy}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="behaviour"
          label="Behaviour"
          value={lessonInfo.behaviour}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="motavation"
          label="Rewards/Motivators"
          value={lessonInfo.motavation}
          onChange={handleChange}
          fullWidth
          required
        />

        <FormControl fullWidth>
          <InputLabel>Exercises to Avoid</InputLabel>
          <Select
            name="avoidExercises"
            value={lessonInfo.avoidExercises}
            onChange={handleMultiSelectChange}
            multiple
            required
          >
            <MenuItem value="Exercise1">Exercise1</MenuItem>
            <MenuItem value="Exercise2">Exercise2</MenuItem>
            <MenuItem value="Exercise3">Exercise3</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {result && (
        <Card variant="outlined" style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Server Response
            </Typography>
            <pre style={{ fontSize: "1rem", color: "green" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </>
  );
}
