import Link from "next/link";
import { Typography, Button, Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  // const { data: session, status } = useSession();
  // if (session) {
  //   router.push('/home');
  // }
  // if (status === 'authenticated') {
  //   router.push('/home');
  // }

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
        <Link href="/" passHref>
          <Button variant="contained" color="secondary" size="large">
            Signup
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="contained" color="secondary" size="large">
            Login
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
