import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./themes/theme";
import NavBar from "./components/common/Navbar/NavBar";
import Layout from "./components/common/Layout";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Estimator from "./pages/Estimator";
import ClimbDetails from "./pages/ClimbDetails";
// import LoginPage from "./components/common/LoginPage";
import Favourites from "./pages/Favourites";
import UserProfile from "./pages/UserProfile";

function App() {
  const pageRoutes = (
    <Routes>
      <Route exact path="/admin-board" element={<Dashboard />} />
      <Route exact path="/estimator" element={<Estimator />} />
      <Route exact path="/" element={<Explore />} />
      <Route exact path="/explore/:slug" element={<ClimbDetails />} />
      {/* <Route exact path="/login" element={<LoginPage />} /> */}
      <Route exact path="/favourites" element={<Favourites/>} />
      <Route exact path="/profile" element={<UserProfile/>} />
    </Routes>
  );

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <>
        <NavBar />
        <Layout>{pageRoutes}</Layout>
      </>
    </ThemeProvider>
  );
}

export default App;
