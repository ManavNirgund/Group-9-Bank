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
import { PersonAdd } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Components/Service/utilities/auth";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Signin() {
  const nav = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [isSigninDisabled, setIsSigninDisabled] = useState(false);

  const redirectPath = location.state?.path || "/";

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
        .post("http://localhost:8080/api/v1/auth/login", values, {
          headers: {
            'Origin': "http://localhost:3000/api/v1/auth/login",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsSigninDisabled(false);

          const token = res.data.access_token;
          console.log(token);
          localStorage.setItem("token", token);
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
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "rgba(173, 2, 83, 0.65)",
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
            marginBottom: "-0.2rem",
            marginTop: "-2rem",
            color: "antiquewhite",
          }}
        >
          Welcome back!
        </Typography>
        <Box
          sx={{
            padding: "1rem",
          }}
        >
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
                  style: { color: "antiquewhite" }, // Set the desired text color
                }}
                InputLabelProps={{
                  style: { color: "antiquewhite" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "antiquewhite", // Set the desired outline color
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="outlined"
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

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                onClick={formik.handleReset}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Link to={"/register"}>
        <Typography
          sx={{
            marginTop: "-2rem",
          }}
        >
          Don't have an account? Signing in is just a few steps away!
        </Typography>
      </Link>
    </Container>
  );
}

export default Signin;
