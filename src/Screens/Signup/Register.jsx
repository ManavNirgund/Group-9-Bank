import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/joy";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PersonAdd from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import { signupUser } from "../../Components/Service/UserService";
import { roles, genders } from "../../Assets/data/enums";
import { useStyles } from "../../__test__/themes/Themes";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import register from "../../Assets/Images/login.gif";
// import "./Register.css"

const Register = () => {
  const nav = useNavigate();
  const [isSignupDisabled, setIsSignupDisabled] = useState(false);

  const formikValues = {
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    aadharNumber: "",
    panNumber: "",
    gender: genders.Male,
    role: roles.CUSTOMER,
  };

  const formikValidationSchema = Yup.object({
    firstname: Yup.string()
      .required("Please enter your name")
      .min(3, "Your First Name cannot be less than 3 characters")
      .max(15, "Your First Name cannot be greater than 15 characters"),
    lastname: Yup.string()
      .required("Please enter your last name")
      .min(3, "Your Last Name cannot be less than 3 characters")
      .max(15, "Your Last Name cannot be greater than 15 characters"),
    dateOfBirth: Yup.string().required("Please enter your Date of Birth"),
    email: Yup.string().required().email("Please enter your Email Address"),
    password: Yup.string()
      .required("Please choose a password")
      .min(8, "Your password must be at least 8 characters long")
      .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phoneNumber: Yup.string()
      .required()
      .min(10, "A phone number must be 10 digits")
      .max(13, "A phone number must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema: formikValidationSchema,
    onSubmit: async (values) => {
      setIsSignupDisabled(true);
      const { confirmPassword, ...formData } = values;
      console.log("Values: ", formData);
      await signupUser(formData);
      formik.resetForm();
    },
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} style={{ display: "flex" }} md={6}>
        <img
          src={register}
          alt="Register"
          height="500rem"
          style={{ alignSelf: "center", marginLeft: "0rem", width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Container
          maxWidth="sm"
          sx={{
            marginBottom: "3rem",
            marginTop: "3rem",
            backgroundColor: "#870040",
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
              variant="h4"
              sx={{ marginTop: "-3rem", color: "white" }}
              align="center"
            >
              Register
            </Typography>
            <Grid container spacing={2} className="mt-4">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formik.values.dateOfBirth}
                    onChange={(newValue) => {
                      formik.setFieldValue("dateOfBirth", newValue);
                    }}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        variant="filled"
                        {...params}
                        error={
                          formik.touched.dateOfBirth &&
                          Boolean(formik.errors.dateOfBirth)
                        }
                        helperText={
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth
                        }
                        InputLabelProps={{
                          style: { color: "black" },
                        }}
                        // inputProps={{
                        //   style: {
                        //     color: "black",
                        //     backgroundColor: "white",
                        //     borderRadius: "5px",
                        //   },
                        // }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                  }}
                >
                  <InputLabel id="gender-label" sx={{ color: "black" }}>
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                  >
                    {Object.values(genders).map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="address"
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="aadharNumber"
                  name="aadharNumber"
                  label="Aadhar Number"
                  value={formik.values.aadharNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.aadharNumber &&
                    Boolean(formik.errors.aadharNumber)
                  }
                  helperText={
                    formik.touched.aadharNumber && formik.errors.aadharNumber
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="panNumber"
                  name="panNumber"
                  label="PAN Number"
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.panNumber && Boolean(formik.errors.panNumber)
                  }
                  helperText={
                    formik.touched.panNumber && formik.errors.panNumber
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                  }}
                >
                  <InputLabel id="role-label" sx={{ color: "black" }}>
                    Role
                  </InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                  >
                    {Object.values(roles).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="filled"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: {
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSignupDisabled}
                  startIcon={
                    isSignupDisabled ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PersonAdd />
                    )
                  }
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  onClick={formik.handleReset}
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={12} display="flex" flexDirection="row">
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "white" }}
                >
                  Already have an account?{" "}
                  <Link to="/signin" className="text-decoration-none">
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register;
