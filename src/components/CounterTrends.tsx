import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTheme } from "@mui/material/styles";
// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CounterTrends: React.FC = () => {
  const theme = useTheme();
  // Select counter data from the Redux store
  const counterData = useSelector((state: RootState) => state.counter.history);

  const data = {
    labels: counterData.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: "Counter Value Over Time",
        data: counterData,
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.light,
      },
    ],
  };

  return (
    <div>
      <h2 style={{ color: theme.palette.primary.dark }}>Counter Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default React.memo(CounterTrends);
