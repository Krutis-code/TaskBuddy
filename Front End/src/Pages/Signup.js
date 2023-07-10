import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../Services/UserServices";
import {
  requiredValidation,
  validateEmail,
  validatePassword,
} from "../helpers/utility";

const theme = createTheme();

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [erros, setErrors] = useState({});

  const navigate = useNavigate();

  const validateField = (e) => {
    let obj;
    if (e === "name") {
      obj = requiredValidation(name, e);
    } else if (e === "email") {
      obj = validateEmail(email);
    } else if (e === "password") {
      obj = validatePassword(password);
      console.log(obj);
    } else if (e === "confirmPassword") {
      obj = validatePassword(confirmPassword);
    }
    setErrors((pre) => ({ ...pre, [e]: obj }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateField("name");
    validateField("password");
    validateField("confirmPassword");
    validateField("email");
    if (
      erros?.email?.isValid &&
      erros?.password?.isValid &&
      erros?.password?.isValid &&
      erros?.confirmPassword?.isValid
    ) {
      let payload = {
        name,
        email,
        password,
      };
      try {
        const res = await userSignup(payload);
        navigate("/tasks");
        console.log("res", res);
        localStorage.setItem("userAuth", res.data.token);
        // localStorage.setItem("AuthToken", JSON.stringify(res.data.token));
        localStorage.setItem("emailId", res.data.email);
      } catch (error) {}
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.name?.isValid === false}
                helperText={erros?.name?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.email?.isValid === false}
                helperText={erros?.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.password?.isValid === false}
                helperText={erros?.password?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.confirmPassword?.isValid === false}
                helperText={erros?.confirmPassword?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
