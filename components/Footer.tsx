import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      sx={{
        overflowX: "hidden",
        overflowY: "hidden",
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid #E4E8ED",
        textAlign: "center",
      }}
    >
      <Grid
        container
        item
        direction="row"
        justifyContent="space-evenly"
        spacing={4}
      >
        <Grid item>
          <Stack spacing={2}>
            <Link style={{ textDecoration: "none" }} href="/" passHref={true}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                }}
                variant="body1"
              >
                Home
              </Typography>
            </Link>
            {/* <Link href="/" passHref={true}>
              <Typography
                sx={{ color: (theme) => theme.palette.common.white }}
                variant="body1"
              >
                Devta
              </Typography>
            </Link> */}
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Link
              style={{ textDecoration: "none" }}
              href="/about"
              passHref={true}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                }}
                variant="body1"
              >
                About
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Link
              style={{ textDecoration: "none" }}
              href="/contact"
              passHref={true}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                }}
                variant="body1"
              >
                Contact
              </Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
