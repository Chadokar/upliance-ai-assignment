import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <Typography variant="body1">No user data available.</Typography>;
  }

  return (
    <Box sx={{ p: 2, backgroundColor: "background.paper", borderRadius: 1 }}>
      <Avatar sx={{ mb: 2, bgcolor: "primary.main" }}>
        {userData?.name?.charAt(0)}
      </Avatar>
      <Typography variant="h6" color="primary.main">
        {userData?.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {userData?.email}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {userData?.address}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {userData?.phone}
      </Typography>
    </Box>
  );
};

export default UserProfile;
