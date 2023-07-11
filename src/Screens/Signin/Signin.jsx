import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Components/Service/utilities/auth";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import login from "../../Assets/Images/login-pic.svg";
import loginPage from "../../Assets/Images/login-page.gif";
import flatGif from "../../Assets/Images/flat-gif.gif";

function Signin() {
  const nav = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [isSigninDisabled, setIsSigninDisabled] = useState(false);

  const redirectPath = location.state?.path || "/";

  const altText = () => {
    return (
      <div>
        <a href="https://www.freepik.com/free-vector/privacy-policy-concept-illustration_20547283.htm#query=login&position=0&from_view=keyword&track=sph">
          Image by storyset on Freepik
        </a>
      </div>
    );
  };

  const formikValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your email")
      .email("Email does not look like this..."),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password should be atleast 8 characters"),
  });

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSigninDisabled(true);
      axios
        .post(
          "http://localhost:8090/authentication/api/v1/auth/login",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            },
          }
        )
        .then((res) => {
          setIsSigninDisabled(false);
          const token = res.data.access_token;

          console.log(token);
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          console.log(values.email, values.password, token);
          auth.login(values.email, values.password, token);
          formik.resetForm();
          nav(redirectPath, { replace: true });
        })
        .catch((res) => {
          alert(res);
          setIsSigninDisabled(false);
        });
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "3rem",
          marginBottom: "3rem",
          backgroundColor: "rgb(173, 2, 83)",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="form"
          noValidate
          className="mt-5 p-5 pt-5"
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h5"
            sx={{
              color: "antiquewhite",
            }}
          >
            Welcome back!
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                  InputLabelProps={{
                    style: { color: "antiquewhite" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "antiquewhite",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                  InputLabelProps={{
                    style: { color: "antiquewhite" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "antiquewhite",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  startIcon={<PersonAdd />}
                  disabled={isSigninDisabled}
                >
                  {isSigninDisabled ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Signin"
                  )}
                </Button>
              </Grid>

              <Grid item xs={4}></Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={formik.handleReset}
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item>
            <Typography
              sx={{
                color: "white",
                marginTop: "-2rem",
              }}
            >
              Don't have an account?
            </Typography>
            <Button variant="link">
              <Link to={"/register"} style={{ fontWeight: "bolder" }}>
                Sign up
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
      <img
        src={flatGif}
        alt="login"
        width="500rem"
        height="500rem"
        style={{ width: "40rem", alignSelf: "flex-end", marginLeft: "-5rem" }}
      />
    </div>
  );
}

export default Signin;
