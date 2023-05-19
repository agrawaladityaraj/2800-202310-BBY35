import { Typography, Button, ButtonGroup, Box, Stack } from "@mui/material";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import Link from "next/link";

const buttons = [
  <Button component={Link} href="/training" key="one">
    Basic Puppy Training
  </Button>,
  <Button key="two">Recommend a Dog</Button>,
  <Button key="three">Browse Dog Breeds</Button>,
  <Button key="four">New Dog</Button>,
];

const buttons2 = [
  <Button key="one">About Us</Button>,
  <Button key="two">Contact</Button>,
];

export default function homeButtons() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          my: 1,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h3"
          component="h3"
          style={{ fontWeight: "bold", marginRight: "1em" }}
        >
          IntelliPaws
        </Typography>
        <Image src={Logo} height={100} width={100} alt="Logo" />
      </Box>

      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        color="secondary"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h5"
          component="h5"
          style={{ fontWeight: "bold", marginRight: "1em" }}
        >
          Information
        </Typography>
      </Box>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        color="secondary"
        variant="contained"
      >
        {buttons2}
      </ButtonGroup>
    </Box>
  );
}
