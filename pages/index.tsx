import Link from "next/link";
import { Typography, Button, Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/assets/images/Logo.png";
import DogGif from "@/assets/images/dog.gif";
import React, { useState } from "react";
import styles from "/styles/Homepage.module.css";

export default function Home() {
  const [clickCount, setclickCount] = useState(0);
  const [showDog, setShowDog] = useState(false);

  const handleLogoClick = () => {
    if (clickCount >= 3) {
      //resetting the click count and show the dog animation
      setclickCount(0);
      setShowDog(true);

      //hide the dog animation after 5 seconds
      setTimeout(() => {
        setShowDog(false);
      }, 810);
    } else {
      //incrementing the click count
      setclickCount(clickCount + 1);
    }
  };

  const router = useRouter();

  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/homepage");
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      p={2}
    >
      <Image
        src={Logo}
        height={100}
        width={100}
        alt="Logo"
        onClick={handleLogoClick}
      />
      {showDog && (
        <div className={styles["dog-animation"]}>
          <Image
            src={DogGif}
            priority={true}
            fill
            style={{ objectFit: "cover" }}
            alt="Dog Licking Screen"
          />
        </div>
      )}
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Welcome to IntelliPaws
      </Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Link href="/signup" passHref>
          <Button variant="contained" color="secondary" size="large">
            Signup
          </Button>
        </Link>
        <Button
          onClick={() => signIn()}
          variant="contained"
          color="secondary"
          size="large"
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
}
