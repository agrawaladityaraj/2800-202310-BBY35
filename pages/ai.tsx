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
  const [dog, setDog] = useState({
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
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dog }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log(data);
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
            value={dog.focus}
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
          value={dog.breed}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="age"
          label="Dog Age"
          value={dog.age}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="energy"
          label="Energy Level"
          value={dog.energy}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="behaviour"
          label="Behaviour"
          value={dog.behaviour}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="reward"
          label="Rewards/Motivators"
          value={dog.reward}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {result && <Typography>{result.result}</Typography>}
      {console.log(result)}
    </>
  );
}
