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

export default function MyForm() {
  const [lessonInfo, setLessonInfo] = useState({
    focus: "",
    breed: "",
    age: "",
    energy: "",
    behaviour: "",
    reward: "",
  });
  const [result, setResult] = useState(null);

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
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data);
    } catch (error) {
      console.error(error);
    }
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
          name="reward"
          label="Rewards/Motivators"
          value={lessonInfo.reward}
          onChange={handleChange}
          fullWidth
          required
        />

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
