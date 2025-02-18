import { useState, useCallback } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleSignUp = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email || !password) {
        setErrors({
          email: !email,
          password: !password,
        });
        toast.error("Please fill in all fields.");
        return;
      }
      localStorage.setItem(email, JSON.stringify({ email, password }));
      const userData = {
        email,
        password,
        id: `user_${Date.now()}`,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("authenticated", "true");
      toast.success("Sign-up successful!");
      navigate("/");
    },
    [email, password, navigate]
  );

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          helperText={errors.email ? "Email is required" : ""}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? "Password is required" : ""}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link href="/signin" underline="hover">
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}

export default SignUp;
