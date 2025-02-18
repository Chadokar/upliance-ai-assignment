import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Counter from "./Counter";
import CounterTrends from "./CounterTrends";

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Counter
            </Typography>
            <Counter />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Counter Trends
            </Typography>
            <CounterTrends />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
