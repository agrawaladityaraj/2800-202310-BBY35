import Image from "next/image";
import lostDog from "@/assets/images/lostDog.png";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" textAlign="center">
        {"Whoops! You're lost."}
      </Typography>
      <Image src={lostDog} alt="Lost Dog" width={360} height={330} />
      <Typography variant="h3" textAlign="center" mb={2}>
        Just like a lost puppy
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClick}
      >
        Take me back home
      </Button>
    </div>
  );
}
