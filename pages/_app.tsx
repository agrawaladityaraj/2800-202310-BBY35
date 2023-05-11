import { SessionProvider } from "next-auth/react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

let theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    mode: "light",
    common: {
      black: "#121923",
      white: "#515e72",
    },
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#121923",
    },
    secondary: {
      main: "#366EE9",
      light: "#368AE9",
      dark: "#3658E9",
    },
  },
});
theme = responsiveFontSizes(theme);

export default function MyAppBase({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        >
          <Navbar />
          <Component {...pageProps} />
          {/* <Footer /> */}
          {/* <SystemAlert /> */}
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
}
