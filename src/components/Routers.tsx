import React, { Suspense } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Loader from "./Loader";

// Private Route Component
function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const navigate = useNavigate();

  const Navbar = () => (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Upliance AI | Assignments
        </Typography>
        <Button color="inherit" onClick={() => navigate("/user-form")}>
          <Link to="/user-form">User Form</Link>
        </Button>
        <Button color="inherit" onClick={() => navigate("/rich-text-editor")}>
          <Link to="/rich-text-editor">Rich Text Editor</Link>
        </Button>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <Button color="inherit" onClick={() => navigate("/")}>
          <Link to="/">Home</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );

  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
}

// Lazy load components
const UserForm = React.lazy(() => import("./UserForm"));
const Login = React.lazy(() => import("./SignIn"));
const SignUp = React.lazy(() => import("./SignUp"));
const RichTextEditor = React.lazy(() => import("./RichTextEditor"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const Home = React.lazy(() => import("./Home"));

const Routers = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    console.log(isAuthenticated);
    if (isAuthenticated) {
      if (
        window.location.pathname === "/signin" ||
        window.location.pathname === "/signup"
      ) {
        navigate("/");
      }
    }
  }, [localStorage.getItem("authenticated")]);

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route
          path="/user-form"
          element={
            <Suspense fallback={<Loader />}>
              <UserForm />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/rich-text-editor"
          element={
            <Suspense fallback={<Loader />}>
              <RichTextEditor />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/signin"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/signup"
        element={
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routers;
