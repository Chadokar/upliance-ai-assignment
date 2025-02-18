import React, { useMemo, useCallback } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { updateCounterHistory } from "../store/counterSlice";
import { RootState } from "../store/store";

const Counter: React.FC = React.memo(() => {
  const count = useSelector(
    (state: RootState) => state.counter.history.slice(-1)[0] || 0
  );

  const maxIntensity = 100;
  const dispatch = useDispatch();

  const scale = useMemo(
    () => 1 + Math.min(Math.abs(count) / maxIntensity, 0.1),
    [count]
  );

  const { scale: springScale } = useSpring({
    scale,
    config: { tension: 300, friction: 20 },
  });

  const buttonSpring = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.9)" },
    config: { tension: 200, friction: 10 },
  });

  const AnimatedBox = animated(Box);
  const AnimatedButton = animated(Button);

  const handleCountChange = useCallback(
    (newCount: number) => {
      dispatch(updateCounterHistory(newCount));
    },
    [dispatch]
  );

  return (
    <AnimatedBox
      style={{ transform: springScale.to((s) => `scale(${s})`) }}
      sx={{ p: 4, borderRadius: 2, transition: "all 0.3s ease" }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h2" fontWeight="bold">
          Counter: {count}
        </Typography>
        <Stack direction="row" spacing={2}>
          <AnimatedButton
            style={buttonSpring}
            variant="contained"
            color="secondary"
            onClick={() => handleCountChange(count - 1)}
            startIcon={<Minus size={20} />}
          >
            Decrease
          </AnimatedButton>
          <AnimatedButton
            style={buttonSpring}
            variant="outlined"
            color="inherit"
            onClick={() => handleCountChange(0)}
            startIcon={<RotateCcw size={20} />}
          >
            Reset
          </AnimatedButton>
          <AnimatedButton
            style={buttonSpring}
            variant="contained"
            color="primary"
            onClick={() => handleCountChange(count + 1)}
            startIcon={<Plus size={20} />}
          >
            Increase
          </AnimatedButton>
        </Stack>
      </Stack>
    </AnimatedBox>
  );
});

export default React.memo(Counter);
