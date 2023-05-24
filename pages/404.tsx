import Image from "next/image";
import lostDog from "@/assets/images/lostDog.png";
import { Button } from "@mui/material";
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
      <h1 style={{ textAlign: "center" }}>Whoops! You're lost.</h1>

      <Image src={lostDog} alt="Lost Dog" width={360} height={330} />
      <h3 style={{ textAlign: "center" }}>Just like a lost puppy...</h3>
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
