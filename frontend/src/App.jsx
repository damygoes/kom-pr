import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./themes/theme";
import NavBar from "./components/NavBar";
import Layout from "./components/common/Layout";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Estimator from "./pages/Estimator";
import ClimbDetails from "./pages/ClimbDetails";
import LoginPage from "./components/common/LoginPage";

function App() {
  return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <NavBar />
          <Layout>
            <Routes>
              <Route exact path="/admin-board" element={<Dashboard />} />
              <Route exact path="/estimator" element={<Estimator />} />
              <Route exact path="/" element={<Explore />} />
              <Route exact path="/explore/:slug" element={<ClimbDetails />} />
              <Route exact path="/login" element={<LoginPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
    
  );
}

export default App;
