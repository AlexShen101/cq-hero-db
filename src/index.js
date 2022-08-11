import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import AppRoutes from "./router/Router.js";
import { createTheme, ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: '#7e97fa'
    }
  }
})
root.render(
  // <ThemeProvider theme={theme}>
  <AppRoutes />
  // </ThemeProvider>
);
