import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import Routers from "./components/Routers";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

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
  const count = useSelector(
    (state: RootState) => state.counter.history.slice(-1)[0] || 0
  );
  const maxIntensity = 100;

  const bezierEasing = (t: number) => {
    return t * t * (3 - 2 * t);
  };

  const location = useLocation();
  const pathname = location.pathname;

  const { background } = useSpring({
    background: `linear-gradient(to top, rgba(107, 70, 193, ${bezierEasing(
      Math.min(Math.abs(count) / maxIntensity, 1)
    )}) ${
      pathname !== "/" && pathname !== "/dashboard"
        ? 0
        : bezierEasing(Math.min(Math.abs(count) / maxIntensity, 1)) * 100
    }%, rgba(107, 70, 193, 0) 0%)`,
    config: {
      tension: 300,
      friction: 20,
    },
  });

  const AnimatedContainer = animated(Container);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <CssBaseline />
        <AnimatedContainer
          maxWidth="xl"
          sx={{ py: 4, height: "100vh" }}
          style={{ background, overflow: "auto" }}
        >
          <Routers />
        </AnimatedContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
