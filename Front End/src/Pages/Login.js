import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Services/UserServices";
import { validateEmail, validatePassword } from "../helpers/utility";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import coverImage from "./../assets/coverImage.jpg";
const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (e) => {
    let obj;
    if (e === "email") {
      obj = validateEmail(email);
      setErrors((pre) => ({ ...pre, [e]: obj }));
    }
    if (e === "password") {
      obj = validatePassword(password);
      setErrors((pre) => ({ ...pre, [e]: obj }));
    }
  };
  const handleSubmit = async (event) => {
    validateField("email");
    validateField("password");
    event.preventDefault();
    console.log("err", erros);
    if (erros?.email?.isValid && erros?.password?.isValid) {
      setLoading(true);
      let payload = {
        email: email,
        password: password,
      };
      try {
        const res = await userLogin(payload);
        console.log("res", res);
        localStorage.setItem("userAuth", res.data.token);
        localStorage.setItem("emailId", res.data.email);
        navigate("/tasks");
        toast.success("Login Successful !");
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
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
            backgroundImage: `url(${coverImage})`,
            // backgroundImage: "url(https://source.unsplash.com/random)",
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
              Sign in
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
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
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : "Sign In"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;
