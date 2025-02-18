import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Counter from "./Counter";
import UserProfile from "./UserProfile";
import RichTextEditor from "./RichTextEditor";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} columns={4}>
        <Grid
          item
          xs={4}
          md={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Counter
            </Typography>
            <Counter />
          </Paper>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              User Profile
            </Typography>
            <UserProfile />
          </Paper>
        </Grid>
        <Grid item xs={4} md={4}>
          <Paper sx={{ p: 2 }}>
            <RichTextEditor />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
