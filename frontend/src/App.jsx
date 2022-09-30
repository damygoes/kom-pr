import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./themes/theme";
import { store } from "./app/store";
import NavBar from "./components/NavBar";
import Layout from "./components/common/Layout";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Estimator from "./pages/Estimator";
import ClimbDetails from './pages/ClimbDetails';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <NavBar />
        <Layout>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/estimator" element={<Estimator />} />
            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/explore/:slug" element={<ClimbDetails />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
