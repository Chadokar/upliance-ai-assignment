import { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setErrors({
        email: !email,
        password: !password,
      });
      toast.error("Please fill in all fields.");
      return;
    }
    const user = JSON.parse(localStorage.getItem(email) || "{}");
    if (user.password === password) {
      localStorage.setItem("authenticated", "true");
      toast.success("Sign-in successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSignIn}>
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
          Sign In
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link href="/signup" underline="hover">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}

export default SignIn;
