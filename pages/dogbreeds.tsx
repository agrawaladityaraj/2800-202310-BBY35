import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DogBreeds() {
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    fetchDogBreeds();
  }, []);

  const fetchDogBreeds = async () => {
    const response = await fetch("/api/fetchdogbreeds");
    const data = await response.json();
    setDogBreeds(data);
  };

  const columns = [
    { field: "breed", headerName: "Breed", width: 130 },
    { field: "countryOfOrigin", headerName: "Country of Origin", width: 130 },
    { field: "furColor", headerName: "Fur Color", width: 130 },
    { field: "heightIn", headerName: "Height (in)", width: 130 },
    { field: "colorOfEyes", headerName: "Color of Eyes", width: 130 },
    { field: "longevityYrs", headerName: "Longevity (yrs)", width: 130 },
    { field: "characterTraits", headerName: "Character Traits", width: 400 },
    {
      field: "commonHealthProblems",
      headerName: "Common Health Problems",
      width: 500,
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%", padding: "0 60px" }}>
      <DataGrid
        rows={dogBreeds}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 15 } },
        }}
        pageSizeOptions={[15, 20, 25]}
      />
    </div>
  );
}
