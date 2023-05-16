import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useSession, signOut } from "next-auth/react";

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
  const { data } = useSession();
  console.log(data);
  console.log(data?.user?.name);

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
            src={data?.user?.image || ""}
            sx={{ width: 80, height: 80 }}
          />
          <Typography
            variant="h4"
            component="h1"
            style={{ fontWeight: "bold", marginTop: "1em" }}
          >
            {data?.user?.name}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "bold", marginBottom: "0.5em" }}
        >
          Email
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "1em" }}>
          {data?.user?.email}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          size="small"
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </Grid>
    </Grid>
  );
}
