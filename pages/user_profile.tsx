import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";

// Mock user data. Replace this with real data from your application.
const mockUser = {
  id: "user123",
  name: "John Doe",
  email: "john.doe@example.com",
  dogs: ["Golden Retriever", "Labrador Retriever"],
  profilePic: "https://example.com/john_doe_pic.jpg", // Replace with actual image url
  bio: "Dog lover. Owner of two wonderful retrievers.",
};

export default function UserProfile() {
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    // Fetch the user's data when the component mounts.
    // Replace this with a call to your API or data context.
    setUser(mockUser);
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
    //   marginTop="60px"
      style={{ minHeight: "100vh", backgroundColor: "#ffffff", padding: "2em" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="2em"
        >
          <Avatar
            alt={user.name}
            src={user.profilePic}
            sx={{ width: 80, height: 80 }}
          />
          <Typography
            variant="h4"
            component="h1"
            style={{ fontWeight: "bold", marginTop: "1em", color: "#3f51b5" }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            {user.bio}
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", marginBottom: "0.5em" }}
        >
          ID
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "1em" }}>
          {user.id}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", marginBottom: "0.5em" }}
        >
          Email
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "1em" }}>
          {user.email}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", marginBottom: "0.5em" }}
        >
          Dogs
        </Typography>
        <List>
          {user.dogs.map((dog, index) => (
            <ListItem key={index}>
              <ListItemText primary={dog} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
