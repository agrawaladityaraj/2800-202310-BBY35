"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
let darkTheme = createTheme({
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
darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
