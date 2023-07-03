import React, { useEffect, useState } from "react";
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

  // useEffect(() => {
  //   axios.get("http://localhost:8081/accounts", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  // }, [])

  const [isCreateTransPressed, setIsCreateTransPressed] = useState(false);
  const [isAddBalancePressed, setIsAddBalancePressed] = useState(false);
  const [isWithBalancePressed, setIsWithBalancePressed] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const transValues = {
    email: "",
    accountNumber: "",
    accountType: account.SAVINGS,
  };

  const addBalanceValues = {
    accountId: "",
    amount: "",
  };

  // const onSubmit = (values) => {
  //   console.log("values: ", values);
  // };

  const validationSchemaCreateTrans = Yup.object({
    email: Yup.string()
      .required("Please enter your email id")
      .email("An email does not look like this"),
    accountNumber: Yup.string().required("Please enter an account number"),
  });

  const validationSchemaAddBalance = Yup.object({
    accountId: Yup.number().required("Please enter the account ID."),
    amount: Yup.number()
      .required("Please enter an amount you wish to deposit.")
      .min(0, "Please enter a positive value"),
  });

  const postTransactionAccount = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post(`http://localhost:8081/accounts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log("Trans: ", res.data);
      })
      .catch((error) => {
        setIsSubmitDisabled(false);
        console.log(error);
      });
  };

  const addBalance = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8081/transactions/add-balance", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsSubmitDisabled(false);
        console.log(error);
      });
  };

  const withdrawBalance = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8081/transactions/withdraw-balance", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsSubmitDisabled(false);
        console.log(error);
      });
  };

  const formikCreateTrasaction = useFormik({
    initialValues: transValues,
    onSubmit: (values) => postTransactionAccount(values),
    validationSchema: validationSchemaCreateTrans,
  });

  const formikAddBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => addBalance(values),
    validationSchema: validationSchemaAddBalance,
  });

  const formikWithdrawBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => withdrawBalance(values),
    validationSchema: validationSchemaAddBalance,
  });

  return (
    <div>
      {/* Welcome {name} */}
      <div>
        <Button
          variant={isCreateTransPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsCreateTransPressed(true);
            setIsAddBalancePressed(false);
            setIsWithBalancePressed(false);
          }}
          sx={{
            border: "none",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: isCreateTransPressed === true ? "black" : "white",
            fontSize: "1rem",
            backgroundColor:
              isCreateTransPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          {" "}
          Create Account{" "}
        </Button>
        <Button
          variant={isAddBalancePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsAddBalancePressed(true);
            setIsCreateTransPressed(false);
            setIsWithBalancePressed(false)
          }}
          sx={{
            border: "none",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: isAddBalancePressed === true ? "black" : "white",
            fontSize: "1rem",
            backgroundColor:
              isAddBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          Add Balance
        </Button>
        <Button
          variant={isWithBalancePressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsWithBalancePressed(true);
            setIsAddBalancePressed(false);
            setIsCreateTransPressed(false)
          }}
          sx={{
            border: "none",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: isWithBalancePressed === true ? "black" : "white",
            fontSize: "1rem",
            backgroundColor:
              isWithBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          Withdraw
        </Button>
        </div>
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
            onSubmit={formikCreateTrasaction.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="email"
                  label="email"
                  value={formikCreateTrasaction.values.email}
                  onChange={formikCreateTrasaction.handleChange}
                  onBlur={formikCreateTrasaction.handleBlur}
                  error={
                    formikCreateTrasaction.touched.email &&
                    formikCreateTrasaction.errors.email
                      ? true
                      : false
                  }
                  helperText={
                    formikCreateTrasaction.touched.email &&
                    formikCreateTrasaction.errors.email
                  }
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
                  value={formikCreateTrasaction.values.accountNumber}
                  onChange={formikCreateTrasaction.handleChange}
                  onBlur={formikCreateTrasaction.handleBlur}
                  error={
                    formikCreateTrasaction.touched.accountNumber &&
                    formikCreateTrasaction.errors.accountNumber
                      ? true
                      : false
                  }
                  helperText={
                    formikCreateTrasaction.touched.accountNumber &&
                    formikCreateTrasaction.errors.accountNumber
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
                    value={formikCreateTrasaction.values.accountType}
                    onChange={formikCreateTrasaction.handleChange}
                    error={
                      formikCreateTrasaction.touched.accountType &&
                      Boolean(formikCreateTrasaction.errors.accountType)
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
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  startIcon={<PersonAdd />}
                >
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

      {isAddBalancePressed && (
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
            onSubmit={formikAddBalance.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="accountId"
                  label="Account ID"
                  value={formikAddBalance.values.accountId}
                  onChange={formikAddBalance.handleChange}
                  onBlur={formikAddBalance.handleBlur}
                  error={
                    formikAddBalance.touched.accountId &&
                    formikAddBalance.errors.accountId
                      ? true
                      : false
                  }
                  helperText={
                    formikAddBalance.touched.accountId &&
                    formikAddBalance.errors.accountId
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="amount"
                  label="Amount"
                  value={formikAddBalance.values.amount}
                  onChange={formikAddBalance.handleChange}
                  onBlur={formikAddBalance.handleBlur}
                  error={
                    formikAddBalance.touched.amount &&
                    formikAddBalance.errors.amount
                      ? true
                      : false
                  }
                  helperText={
                    formikAddBalance.touched.amount &&
                    formikAddBalance.errors.amount
                  }
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
                  startIcon={<PersonAdd />}
                >
                  {" "}
                  Create{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => formikAddBalance.resetForm()}
                >
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
                    setIsAddBalancePressed(false);
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
      {isWithBalancePressed && (
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
            onSubmit={formikWithdrawBalance.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="accountId"
                  label="Account ID"
                  value={formikWithdrawBalance.values.accountId}
                  onChange={formikWithdrawBalance.handleChange}
                  onBlur={formikWithdrawBalance.handleBlur}
                  error={
                    formikWithdrawBalance.touched.accountId &&
                    formikWithdrawBalance.errors.accountId
                      ? true
                      : false
                  }
                  helperText={
                    formikWithdrawBalance.touched.accountId &&
                    formikWithdrawBalance.errors.accountId
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="amount"
                  label="Amount"
                  value={formikWithdrawBalance.values.amount}
                  onChange={formikWithdrawBalance.handleChange}
                  onBlur={formikWithdrawBalance.handleBlur}
                  error={
                    formikWithdrawBalance.touched.amount &&
                    formikWithdrawBalance.errors.amount
                      ? true
                      : false
                  }
                  helperText={
                    formikWithdrawBalance.touched.amount &&
                    formikWithdrawBalance.errors.amount
                  }
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
                  startIcon={<PersonAdd />}
                >
                  {" "}
                  Create{" "}
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => formikWithdrawBalance.resetForm()}
                >
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
                    setIsWithBalancePressed(false);
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
