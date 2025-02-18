import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Routers from "./components/Routers";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B46C1", // Purple
      light: "#9F7AEA",
      dark: "#553C9A",
    },
    secondary: {
      main: "#319795", // Teal
      light: "#4FD1C5",
      dark: "#2C7A7B",
    },
    background: {
      default: "#F7FAFC",
      paper: "#FFFFFF",
    },
  },
});

function App() {
  const AnimatedContainer = animated(Container);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <CssBaseline />
        <AnimatedContainer
          maxWidth="xl"
          sx={{ py: 4, height: "100vh" }}
          style={{ overflow: "auto" }}
        >
          <Routers />
        </AnimatedContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
