import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import Context from "@/Context/Context";
import AuthWrapper from "@/components/AuthWrapper";
import { IContext } from "@/models";
import dogprofile from "@/assets/images/dogprofile.png";
import Image from "next/image";

interface Vaccine {
  id: string;
  name: string;
  date: string;
}

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
  vaccines: Vaccine[];
}

function DogProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { user }: IContext = useContext(Context);

  const [dog, setDog] = useState<Dog | null>(null);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");

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

  useEffect(() => {
    if (user.id && id) {
      (async () => {
        await fetchDogData();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  if (!dog) {
    return <div>Loading...</div>;
  }

  const handleAddVaccine = async () => {
    const response = await fetch("/api/vaccine/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: vaccineName,
        date: vaccineDate,
        dogId: dog.id,
      }),
    });

    if (response.ok) {
      alert("Vaccine added successfully");
      setVaccineDate("");
      setVaccineName("");
    } else {
      alert("Error adding vaccine");
    }
  };

  // Formatting birthdate
  const formattedBirthDate = new Date(dog.birthDate).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  function calculateAge(formattedBirthDate: Date): number {
    const today = new Date();
    const birthdateObj = new Date(formattedBirthDate);
    let age = today.getFullYear() - birthdateObj.getFullYear();

    // Check if the dog's birthday has occurred this year
    const isBirthdayPassed =
      today.getMonth() > birthdateObj.getMonth() ||
      (today.getMonth() === birthdateObj.getMonth() &&
        today.getDate() >= birthdateObj.getDate());

    // If the dog's birthday hasn't passed yet this year, subtract 1 from the age
    if (!isBirthdayPassed) {
      age--;
    }

    return age;
  }

  return (
    <AuthWrapper>
      <Grid
        container
        justifyContent="center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          padding: "1em",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginBottom="1em"
          >
            <Image src={dogprofile} alt={dog.name} height={80} width={80} />
            <Typography variant="h3" mb={2} fontWeight="bold" mt={3}>
              {dog.name}
            </Typography>
            <Typography variant="subtitle1" fontSize={22}>
              <strong>Breed:</strong> {dog.breed.breed}
            </Typography>
            <Typography variant="subtitle1" fontSize={22}>
              <strong>Birthdate:</strong> {formattedBirthDate}
            </Typography>
            <Typography variant="subtitle1" fontSize={22}>
              <strong>Age:</strong> {calculateAge(new Date(formattedBirthDate))}{" "}
              years
            </Typography>
          </Box>
          {!dog.vaccines.length ? (
            <></>
          ) : (
            <Box ml={6}>
              <Typography variant="subtitle1" fontSize={22}>
                <strong>Vaccines:</strong>
              </Typography>
              <List sx={{ ml: 0 }}>
                {dog.vaccines &&
                  dog.vaccines.map((vaccine) => (
                    <ListItem key={vaccine.id}>
                      <Typography fontWeight="bold">
                        {vaccine.name + " Vaccine"}
                      </Typography>
                      <Typography>&nbsp;</Typography>
                      <Typography>
                        {"expires on "}
                        {new Date(vaccine.date).toLocaleDateString()}
                      </Typography>
                    </ListItem>
                  ))}
              </List>
            </Box>
          )}
          <Box marginBottom={2} ml={3} mr={2}>
            <TextField
              label="Vaccine Name"
              fullWidth
              value={vaccineName}
              onChange={(e) => setVaccineName(e.target.value)}
              color="secondary"
              size="small"
            />
          </Box>
          <Box marginBottom={2} ml={3} mr={2}>
            <TextField
              label="Vaccine Expiry Date"
              type="date"
              fullWidth
              value={vaccineDate}
              color="secondary"
              size="small"
              onChange={(e) => setVaccineDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box ml={3} mr={2}>
            <Button
              variant="contained"
              onClick={handleAddVaccine}
              size="small"
              color="secondary"
            >
              Add Vaccine
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default DogProfile;
