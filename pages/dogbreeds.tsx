import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DogBreeds() {
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    fetchDogBreeds();
  }, []);

  const fetchDogBreeds = async () => {
    const response = await fetch("/api/dog-breeds");
    const data = await response.json();
    setDogBreeds(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "breed", headerName: "Breed", width: 130 },
    { field: "countryOfOrigin", headerName: "Country of Origin", width: 130 },
    { field: "furColor", headerName: "Fur Color", width: 130 },
    { field: "heightIn", headerName: "Height (in)", width: 130 },
    { field: "colorOfEyes", headerName: "Color of Eyes", width: 130 },
    { field: "longevityYrs", headerName: "Longevity (yrs)", width: 130 },
    { field: "characterTraits", headerName: "Character Traits", width: 200 },
    {
      field: "commonHealthProblems",
      headerName: "Common Health Problems",
      width: 200,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={dogBreeds} columns={columns} checkboxSelection />
    </div>
  );
}
