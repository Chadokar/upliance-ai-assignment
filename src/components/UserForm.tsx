import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { setUserData } from "../store/userSlice";

interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setFormData({ ...JSON.parse(userData) });
    }
  }, []);

  const [userId, setUserId] = useState<string>(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "").id
      : `user_${Date.now()}`
  );

  console.log(userId);

  const [isDirty, setIsDirty] = useState(false);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 280, friction: 20 },
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      id: userId,
      ...formData,
    };
    dispatch(setUserData(userData));
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsDirty(false);
  };

  const AnimatedForm = animated.form;

  return (
    <AnimatedForm
      style={{
        ...formAnimation,
        maxWidth: "400px",
        margin: "2rem auto",
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <Typography variant="h6" component="h2" fontWeight="bold">
          User Information
        </Typography>

        <TextField label="User ID" value={userId || ""} disabled fullWidth />

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Save
        </Button>
      </Stack>
    </AnimatedForm>
  );
};

export default UserForm;
