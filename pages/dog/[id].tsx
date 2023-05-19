import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { Avatar, Grid, Typography, Box } from "@mui/material";
import Context from "@/Context/Context";
import AuthWrapper from "@/components/AuthWrapper";
import { IContext } from "@/models";

interface DogBreed {
  id: string;
  breed: string;
  countryOfOrigin: string;
}

interface Dog {
  id: string;
  name: string;
  birthDate: string;
  breedId: string;
  pictureUrl: string;
  breed: DogBreed;
}

function DogProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [dog, setDog] = useState<Dog | null>(null);
  const { user }: IContext = useContext(Context);

  useEffect(() => {
    if (user.id) {
      const fetchDogData = async () => {
        try {
          const dogData = await fetch(`/api/dog/${user.id}`);
          const dogs = await dogData.json();
          const selectedDog = dogs.find((dog: Dog) => dog.id === id);

          if (selectedDog) {
            setDog(selectedDog);
          }
        } catch (error) {
          console.error("Error fetching dog data:", error);
        }
      };

      if (id) {
        fetchDogData();
      }
    }
  }, [id, user]);

  if (!dog) {
    return <div>Loading...</div>;
  }

  // Formatting birthdate
  const formattedBirthDate = new Date(dog.birthDate).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <AuthWrapper>
      <Box mt={1} ml={4} mr={4}>
        <Grid container spacing={1}>
          <Grid item>
            <Avatar
              alt={dog.name}
              src={dog.pictureUrl}
              sx={{ width: 65, height: 65 }}
            />
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h2" mb={2} fontWeight="bold">
              {dog.name}
            </Typography>
            <Typography variant="subtitle1" fontSize={22}>
              <strong>Breed:</strong> {dog.breed.breed}
            </Typography>
            <Typography variant="subtitle1" fontSize={22}>
              <strong>Birthdate:</strong> {formattedBirthDate}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
}

export default DogProfile;
