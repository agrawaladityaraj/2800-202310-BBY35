import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

import "@/styles/globals.css";
import State from "@/Context/State";
import MountedWrapper from "@/components/MountedWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import Chat from "@/components/Chat";

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
      main: "#729b79",
      light: "#bacdb0",
      dark: "#475b63",
    },
  },
});
theme = responsiveFontSizes(theme);

export default function MyAppBase({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <>
      <Head>
        <title>IntelliPaws</title>
      </Head>
      <SessionProvider session={session}>
        <State>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MountedWrapper>
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
                <Footer />
                <Alert />
                <Chat />
              </Box>
            </MountedWrapper>
          </ThemeProvider>
        </State>
      </SessionProvider>
    </>
  );
}
