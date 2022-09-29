import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { appTheme } from "./themes/theme";
import { store } from "./app/store";
import NavBar from "./components/NavBar";
import Layout from "./components/common/Layout";
import Explore from "./pages/Explore";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <NavBar />
        <Layout>
          <Explore />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
