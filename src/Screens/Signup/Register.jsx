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
// import { useStyles } from "../../__test__/themes/Themes";

import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

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
      .min(3, "Your First Name cannot be less 3 characters")
      .max(15, "Your First Name cannot be greater than 15 characters"),
    lastname: Yup.string()
      .required("Please enter your last name")
      .min(3, "Your Last Name cannot be less 3 characters")
      .max(15, "Your Last Name cannot be greater than 15 characters"),
    dateOfBirth: Yup.string().required("Please enter your Date of Birth"),
    email: Yup.string().required().email("Please your Email Address"),
    password: Yup.string()
      .required("Please choose a password")
      .min(8, "Your password must be atleast 8 characters long")
      .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phoneNumber: Yup.string()
      .required()
      .min(10, "A phone number is always 10 digits")
      .max(13, "A phone number is always 10 digits"),
  });

  // const encryptPassword = async (pass, salt) => {
  //   const hashedPassword = await bcrypt.hash(pass, salt);

  //   return {
  //     ...formik.values,
  //     password: hashedPassword,
  //   };
  // };

  const formik = useFormik({
    initialValues: formikValues,
    validationSchema: formikValidationSchema,
    onSubmit: async (values) => {
      setIsSignupDisabled(true);
      const { confirmPassword, ...formData } = values;
      console.log("Values: ", formData);
      signupUser(formData);
      setIsSignupDisabled(false);
      nav("/signin");
      formik.resetForm();
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{
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
          variant="h5"
          sx={{
            marginBottom: "2rem",
            marginTop: "-3rem",
            color: "antiquewhite",
          }}
        >
          Sign up to enter a world of benifits!
        </Typography>
        <Box
          sx={{
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="First Name"
                id="firstname"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && formik.errors.firstname
                    ? true
                    : false
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
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
              <TextField
                fullWidth
                required
                label="Last Name"
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && formik.errors.lastname
                    ? true
                    : false
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
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
                label="password"
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

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                required
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
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
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? true
                    : false
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
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
                label="Address"
                name="address"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={
                  formik.touched.address && formik.errors.address ? true : false
                }
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  style: { color: "antiquewhite" }, // Set the desired text color
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
                label="Aadhar Number"
                name="aadharNumber"
                type="text"
                value={formik.values.aadharNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.aadharNumber && formik.errors.aadharNumber
                    ? true
                    : false
                }
                helperText={
                  formik.touched.aadharNumber && formik.errors.aadharNumber
                }
                InputProps={{
                  style: { color: "antiquewhite" }, // Set the desired text color
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
                label="Pan Number"
                name="panNumber"
                type="text"
                value={formik.values.panNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.panNumber && formik.errors.panNumber
                    ? true
                    : false
                }
                helperText={formik.touched.panNumber && formik.errors.panNumber}
                InputProps={{
                  style: { color: "antiquewhite" }, // Set the desired text color
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
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  name="gender"
                  labelId="gender-label"
                  label="Gender"
                  id="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {Object.entries(genders).map(([genderValue, genderLabel]) => (
                    <MenuItem key={genderValue} value={genderValue}>
                      {genderLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  name="role"
                  labelId="role-label"
                  label="Role"
                  id="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {Object.entries(roles).map(([roleValue, roleLabel]) => (
                    <MenuItem key={roleValue} value={roleValue}>
                      {roleLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              sx={{
                width: "300px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formik.values.dateOfBirth}
                    onChange={(date) =>
                      formik.setFieldValue("dateOfBirth", date)
                    }
                    onBlur={formik.handleBlur}
                    renderInput={(params) => <TextField {...params} />}
                    error={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<PersonAdd />}
              >
                {isSignupDisabled ? (
                  <CircularProgress color="primary" />
                ) : (
                  "Signup"
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
      <Link to={"/signin"}>Already have an Account? Sign in here.</Link>
    </Container>
  );
};

export default Register;
