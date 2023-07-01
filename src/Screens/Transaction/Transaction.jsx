import React, { useState } from "react";
import DahboardNav from "../../Components/DahboardNav/DahboardNav";
import { account } from "../../Assets/data/enums";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Transaction = () => {
  const [isCreateTransPressed, setIsCreateTransPressed] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const initialValues = {
    email: "",
    accountNumber: "",
    accountType: account.SAVINGS,
  };

  // const onSubmit = (values) => {
  //   console.log("values: ", values);
  // };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your email id")
      .email("An email does not look like this"),
    accountNumber: Yup.string().required("Please enter an account number"),
  });

  const postTransactionAccount = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8081/accounts", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log("Trans: ", res.data);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => postTransactionAccount(values),
    validationSchema: validationSchema,
  });

  return (
    <div>
      Welcome {name}
      <Button variant="contained" onClick={isCreateTransPressed}>
        {" "}
        Create Account{" "}
      </Button>
      {isCreateTransPressed && (
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="email"
                  label="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="accountNumber"
                  label="Account Number"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.accountNumber && formik.errors.accountNumber
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.accountNumber && formik.errors.accountNumber
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="account-label" sx={{ color: "white" }}>
                    Account Type
                  </InputLabel>
                  <Select
                    labelId="account-label"
                    id="accountType"
                    name="accountType"
                    value={formik.values.accountType}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.accountType &&
                      Boolean(formik.errors.accountType)
                    }
                    inputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {Object.values(account).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" color="primary" type="submit">
                  {" "}
                  Create{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" color="warning">
                  {" "}
                  Clear{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setIsCreateTransPressed(false);
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
      <DahboardNav />
    </div>
  );
};

export default Transaction;
