import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";

import Context from "@/Context/Context";
import AuthWrapper from "@/components/AuthWrapper";
import Image from "next/image";
import { IContext } from "@/models";
import dogwithfriends from "@/assets/images/dogwithfriends.png";

interface Dog {
  id: string;
  name: string;
  ownerId: string;
}

function DogPage() {
  const { user }: IContext = useContext(Context);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    if (user.id) {
      fetch(`/api/dog/${user.id}`)
        .then((response) => response.json())
        .then((data) => setDogs(data));
    }
  }, [user]);

  return (
    <AuthWrapper>
      <>
        <div style={{ margin: "16px" }}>
          <Typography variant="h2" component="h1" m={3}>
            My Dogs
          </Typography>
          <List sx={{ margin: "0 16px" }}>
            {dogs.map((dog) => (
              <ListItem
                key={dog.id}
                component="li"
                sx={{
                  padding: "6px",
                  "& a": {
                    textDecoration: "none",
                  },
                }}
              >
                <Link href={`/dog/${dog.id}`} passHref>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h5"
                        color={"black"}
                        fontWeight={"bold"}
                      >
                        {dog.name}
                      </Typography>
                    }
                  />
                </Link>
              </ListItem>
            ))}
            <Box mt={1}>
              <Button
                component={Link}
                href="/add_dog"
                variant="contained"
                color="secondary"
              >
                Add a new dog
              </Button>
            </Box>
          </List>
          <div style={{ textAlign: "center" }}>
            <Image
              src={dogwithfriends}
              alt="Dog Image"
              width={330}
              height={190}
            />
          </div>
        </div>
      </>
    </AuthWrapper>
  );
}

export default DogPage;
