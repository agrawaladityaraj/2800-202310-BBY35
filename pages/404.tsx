import React from "react";
import Link from "next/link";
import Image from "next/image";
import lostDog from "@/assets/images/lostDog.png";
import { Button } from "@mui/material";

export default function Custom404() {
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
      <Link href="/" style={{ marginBottom: 7 }}>
        <Button variant="contained" color="secondary" size="small">
          Take me back home
        </Button>
      </Link>
    </div>
  );
}
