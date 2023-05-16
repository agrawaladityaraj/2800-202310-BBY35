import Link from "next/link";
import { Typography, Button, Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Home() {
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
