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
  Paper,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
import axios from "axios";
import { Table } from "react-bootstrap";

const Transaction = () => {
  // useEffect(() => {
  //   axios.get("http://localhost:8090/transaction/accounts", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const number = Math.floor(Math.random() * 9999999999) + 100;
    formikCreateTrasaction.setFieldValue("accountNumber", number.toString());
  }, []);

  let isAdmin = JSON.parse(localStorage.getItem("asAdmin"));

  const [isAllUsersPressed, setIsAllUsersPressed] = useState();
  const [isCreateTransPressed, setIsCreateTransPressed] = useState(false);
  const [isAddBalancePressed, setIsAddBalancePressed] = useState(false);
  const [isWithBalancePressed, setIsWithBalancePressed] = useState(false);

  const [accounts, setAccounts] = useState(null);

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

  const tableStyle = {
    minWidth: "650px",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "lightgray",
  };

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

  // const generateAccountNumber = () => {
  //   const number = Math.floor(Math.random()*9000)+100;
  //   // setGeneratedNumber(number);
  //   formikCreateTrasaction.setFieldValue("accountNumber", number.toString())
  // }

  const addBalance = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post(
        "http://localhost:8090/transaction/transactions/add-balance",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsSubmitDisabled(false);
        console.log(error);
        alert(`${error.name}: ${error.message}`);
      });
  };

  const withdrawBalance = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post(
        "http://localhost:8090/transaction/transactions/withdraw-balance",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setIsSubmitDisabled(false);
        console.log(res.data);
        alert("Account created successfully.");
      })
      .catch((error) => {
        setIsSubmitDisabled(false);
        console.log(error);
        alert(`${error.name}: ${error.message}`);
      });
  };

  const allUsers = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8090/transaction/accounts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        alert(`Error retrieving transaction data ${error.response.data}`);
      });
  };

  const formikCreateTrasaction = useFormik({
    initialValues: transValues,
    onSubmit: (values) => {
      setIsSubmitDisabled(true);
      console.log(values);
      axios
        .post(`http://localhost:8090/transaction/accounts`, values, {
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
          alert(`${error.name}: ${error.message}`);
        });
    },
    validationSchema: validationSchemaCreateTrans,
  });

  const formikAddBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => {
      setIsSubmitDisabled(true);
      axios
        .post(
          "http://localhost:8090/transaction/transactions/add-balance",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsSubmitDisabled(false);
          console.log(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          setIsSubmitDisabled(false);
          console.log(error);
          alert(`${error.response.data}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  const formikWithdrawBalance = useFormik({
    initialValues: addBalanceValues,
    onSubmit: (values) => {
      setIsSubmitDisabled(true);
      axios
        .post(
          "http://localhost:8090/transaction/transactions/withdraw-balance",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsSubmitDisabled(false);
          formikWithdrawBalance.resetForm();
        })
        .catch((error) => {
          setIsSubmitDisabled(false);
          console.log(error);
          alert(`${error.name}: ${error.message}`);
        });
    },
    validationSchema: validationSchemaAddBalance,
  });

  return (
    <div>
      {/* Welcome {name} */}
      <div>
        {isAdmin && (
          <Button
            variant={isAllUsersPressed === true ? "contained" : "outlined"}
            onClick={() => {
              setIsCreateTransPressed(false);
              setIsAddBalancePressed(false);
              setIsWithBalancePressed(false);
              setIsAllUsersPressed(true);
              allUsers();
            }}
            sx={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              marginRight: "8px",
              color: "black",
              border: "2px solid #870040",
              fontSize: "1rem",
              backgroundColor:
                isAllUsersPressed === true ? "antiquewhite" : "inherit",
              "&:hover": {
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            {" "}
            All users{" "}
          </Button>
        )}
        <Button
          variant={isCreateTransPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsCreateTransPressed(true);
            setIsAddBalancePressed(false);
            setIsWithBalancePressed(false);
            setIsAllUsersPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isCreateTransPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              // backgroundColor: "rgba(0, 0, 0, 0)",
              // color: "white",
            },
            "&:active": {
              border: "none",
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
            setIsWithBalancePressed(false);
            setIsAllUsersPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isAddBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              // backgroundColor: "rgba(0, 0, 0, 0)",
              // color: "white",
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
            setIsCreateTransPressed(false);
            setIsAllUsersPressed(false);
          }}
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "8px",
            color: "black",
            border: "2px solid #870040",
            fontSize: "1rem",
            backgroundColor:
              isWithBalancePressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              // backgroundColor: "rgba(0, 0, 0, 0)",
              // color: "white",
            },
            "&:active": {
              // transform: `translateY(${theme.spacing(-1)})`,
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
            backgroundColor: "rgba(173, 2, 83)",
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
                    // readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="accountNumber"
                  label="Account Number"
                  // value={formikCreateTrasaction.values.accountNumber}
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
                    readOnly: true,
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
            backgroundColor: "rgb(173, 2, 83)",
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

      {accounts && isAllUsersPressed && (
        <TableContainer component={Paper} sx={{ backgroundColor: "#D9D9D9" }}>
          <Table sx={tableStyle} aria-label="Table">
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>ID</TableCell>
                <TableCell sx={headerCellStyle}>Account Number</TableCell>
                <TableCell sx={headerCellStyle}>Account Type</TableCell>
                <TableCell sx={headerCellStyle}>Balance</TableCell>
                <TableCell sx={headerCellStyle}>Joined on</TableCell>
                <TableCell sx={headerCellStyle}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((item) => (
                <TableRow key={item.id}>
                  {console.log(item.id)}
                  <TableCell sx={cellStyle}>{item.id}</TableCell>
                  <TableCell sx={cellStyle}>{item.accountNumber}</TableCell>
                  <TableCell sx={cellStyle}>{item.accountType}</TableCell>
                  <TableCell sx={cellStyle}>{item.balance}</TableCell>
                  <TableCell sx={cellStyle}>{item.createdAt}</TableCell>
                  <TableCell sx={cellStyle}>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {isWithBalancePressed && (
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgb(173, 2, 83)",
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
      {/* {isCreateTransPressed == false &&
        isAddBalancePressed == false &&
        isWithBalancePressed == false && (
          <img src={dashboardImage} alt="Dashboard image" />
        )} */}
    </div>
  );
};

export default Transaction;
