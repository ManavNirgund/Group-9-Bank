import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const Locker = () => {
  const [selectedButton, setSelectedButton] = useState(false);
  const [isReserveLockerPressed, setIsReserveLockerPressed] = useState(false);
  const [isSigninDisabled, setIsSigninDisabled] = useState(false);
  const [tableData, setTableableData] = useState();

  const name = localStorage.getItem("name");

  const inititalValues = {
    customer: "",
  };

  const validationSchema = Yup.object({
    customer: Yup.string()
      .required("Please enter your Email Address")
      .email("This is not how an Email Address looks like"),
  });

  const postLockerData = (values) => {
    setIsSigninDisabled(true);
    axios
      .post("localhost:8083/lockers/reserve", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSigninDisabled(false);
      })
      .catch((res) => {
        alert("Something went wrong! Please try again.", res);
        formik.resetForm();
        setIsSigninDisabled(false);
      });
  };

  const formik = useFormik({
    initialValues: inititalValues,
    onSubmit: (values) => postLockerData(values),
    validationSchema: validationSchema,
  });

  // useEffect(() => {
  //  axios.get("http:localhost:8083/lockers/availability?size=L", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   })
  //  .then((response) => response.data)
  //     .then((data) => {
  //       // Update the state with the API response
  //       setTableableData(data.firstname);
  //       setUserType(data.authorities[0].authority);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, [])

  return (
    <div className="tabless">
      {/* <div>
        <Typography color="beige" variant="h5">
          Welcome {name}
        </Typography>
      </div> */}
      <Button
        variant={selectedButton === true ? "contained" : "outlined"}
        onClick={() => {
          setSelectedButton(true);
          setIsReserveLockerPressed(true);
        }}
        sx={{
          border: "2px solid #870040",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: "black",
          fontSize: "1rem",
          backgroundColor: selectedButton === true ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none"
          },
        }}
      >
        Reserve a locker
      </Button>
      {/* Form fields here */}
      {isReserveLockerPressed && (
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "-2rem",
            marginBottom: "1rem",
            backgroundColor: "rgba(173, 2, 83, 1)",
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="customer"
                  label="Email"
                  value={formik.values.customer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.customer && formik.errors.customer
                      ? true
                      : false
                  }
                  helperText={formik.touched.customer && formik.errors.customer}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={isSigninDisabled}
                  startIcon={<PersonAdd />}
                >
                  {isSigninDisabled ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Reserve"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<ClearIcon />}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setSelectedButton(false);
                    setIsReserveLockerPressed(false);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Locker;
