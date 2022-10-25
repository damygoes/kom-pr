import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: { main: "#e82c0c" },
    secondary: { main: "#ff4b00" },
    textColor: { main: "#2d2726" },
    errorColor: { main: "#ff0100" },
  },
  typography: {
    h1: {
      fontFamily: "Oswald",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Oswald",
      fontWeight: 500,
    },
    h3: {
      fontFamily: "Oswald",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "Oswald",
      fontWeight: 300,
    },
    h5: {
      fontFamily: "Oswald",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Oswald",
      fontWeight: 200,
      fontSize: "0.9rem",
    },
    subtitle1: {
      fontFamily: "Oswald",
    },
    subtitle2: {
      fontFamily: "Oswald",
    },
    body1: {
      fontFamily: "Source Sans Pro",
    },
    body2: {
      fontFamily: "Source Sans Pro",
    },
    caption: {
      fontFamily: "Source Sans Pro",
    },
  },
});
