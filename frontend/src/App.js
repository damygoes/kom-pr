import { ThemeProvider, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import { appTheme } from "./themes/theme";
import Layout from "./components/common/Layout";
import Explore from "./pages/Explore";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Layout>
        <Explore />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
