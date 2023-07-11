import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
// import { Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

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

const CreditCard = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isApplyCreditPressed, setIsApplyCreditPressed] = useState(false);
  const [isPayCreditPressed, setIsPayCreditPressed] = useState(false);
  const [isMakePaymentCreditPressed, setIsMakePaymentCreditPressed] = useState(false);

  const [userType, setUserType] = useState("");
  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");

  // useEffect(() => {
  //   // Retrieve email and token from local storage
  //   const email = localStorage.getItem("email");
  //   const token = localStorage.getItem("token");

  //   // Call the API using the retrieved email and token
  //   axios.get(`http://localhost:8084/credit-cards`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((response) => response.data)
  //     .then((data) => {
  //       // Update the state with the API response
  //       setFirstName(data.firstname);
  //       setUserType(data.authorities[0].authority);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    // Retrieve email and token from local storage
    const email = localStorage.getItem("email");

    // Simulating API call by setting static data
    const apiData = [
      {
        id: 1,
        accountID: 123456,
        customer: "Manav",
        cardNo: 78945122,
        usedCredit: "10,000",
        creditLimit: "15,000",
        interest: "5%",
        status: "Payment  Due",
        createdAt: "2023-06-29",
      },
      // Add more data here...
    ];

    // Simulating the user type based on the role
    const role = "Admin";

    // Update the state with the static data and user type
    setApiData(apiData);
    setUserTypes(role);
  }, []);

  const applyCreditValues = {
    creditLimit: "",
    interestRate: "",
    customer: "",
    accountId: "",
  };

  const payValues = {
    cardNumber: "",
    amount: "",
  };

  const validationSchemaApplyCredit = Yup.object({
    creditLimit: Yup.string().required("Please enter the credit limit"),
    interestRate: Yup.string().required("Please enter the interest rate"),
    customer: Yup.string().required("Please enter the username"),
    accountId: Yup.number().required("Please enter the account id"),
  });

  const validationSchemaPay = Yup.object({
    cardNumber: Yup.string().required("Please enter the credit card number"),
    amount: Yup.number().required("Please enter the payment amount"),
  });

  const postApplyCredit = (values) => {
    const min = 100000000000;
    const max = 999999999999;
    const updatedValues = {
      ...values,
      cradNumber: Math.floor(Math.random() * (max - min + 1)) + min,
    };

    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8084/credit-cards", updatedValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitDisabled(false);
      });
  };

  const payCredit = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8084/credit-cards/pay", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitDisabled(false);
      });
  };

  const makePayment = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8084/credit-cards/make-payment", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSubmitDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitDisabled(false);
      });
  };

  const formikApplyCredit = useFormik({
    initialValues: applyCreditValues,
    onSubmit: (values) => postApplyCredit(values),
    validationSchema: validationSchemaApplyCredit,
  });

  const formikPayCredit = useFormik({
    initialValues: payValues,
    onSubmit: (values) => payCredit(values),
    validationSchema: validationSchemaPay,
  });

  const formikMakePaymentCredit = useFormik({
    initialValues: payValues,
    onSubmit: (values) => payCredit(values),
    validationSchema: validationSchemaPay,
  });

  const [apiData, setApiData] = useState([
    {
      id: 1,
      accountID: 123456,
      customer: "Manav",
      cardNo: 78945122,
      usedCredit: "10,000",
      creditLimit: "15,000",
      interest: "5%",
      status: "Payment  Due",
      createdAt: "2023-06-29",
    },
    // Add more data here...
  ]);
  const adminTable = (
    <TableContainer component={Paper} sx={{ backgroundColor: "#D9D9D9" }}>
      <Table sx={tableStyle} aria-label="Table">
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>ID</TableCell>
            <TableCell sx={headerCellStyle}>Account ID</TableCell>
            <TableCell sx={headerCellStyle}>Customer</TableCell>
            <TableCell sx={headerCellStyle}>Card No</TableCell>
            <TableCell sx={headerCellStyle}>Used Credit</TableCell>
            <TableCell sx={headerCellStyle}>Credit Limit</TableCell>
            <TableCell sx={headerCellStyle}>Interest</TableCell>
            <TableCell sx={headerCellStyle}>Status</TableCell>
            <TableCell sx={headerCellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={cellStyle}>{item.id}</TableCell>
              <TableCell sx={cellStyle}>{item.accountID}</TableCell>
              <TableCell sx={cellStyle}>{item.customer}</TableCell>
              <TableCell sx={cellStyle}>{item.cardNo}</TableCell>
              <TableCell sx={cellStyle}>{item.usedCredit}</TableCell>
              <TableCell sx={cellStyle}>{item.creditLimit}</TableCell>
              <TableCell sx={cellStyle}>{item.interest}</TableCell>
              <TableCell sx={cellStyle}>{item.status}</TableCell>
              <TableCell sx={cellStyle}>
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: "#FFC107", color: "#000" }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: "#DC3545", color: "#000" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  const customerTableData = [
    {
      label: "ID",
      value: "1",
    },
    {
      label: "Card No.",
      value: "5878851032032",
    },
    {
      label: "Used Credit",
      value: "10000",
    },
    {
      label: "Credit Limit",
      value: "15000",
    },
    {
      label: "Interest",
      value: "5%",
    },
    {
      label: "Status",
      value: "Approved",
    },
  ];

  const customerTable = (
    <TableContainer component={Paper} sx={{ backgroundColor: "#D9D9D9" }}>
      <Table sx={tableStyle} aria-label="Table">
        <TableBody>
          {customerTableData.map((row) => (
            <TableRow key={row.label}>
              <TableCell sx={{ ...headerCellStyle, width: "30%" }}>
                {row.label}
              </TableCell>
              <TableCell sx={cellStyle}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div class="tabless">
      <div>
        <Button
          variant={isApplyCreditPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsApplyCreditPressed(true);
            setIsPayCreditPressed(false);
          }}
          sx={{
            border: "none",
            marginRight: "8px",
            marginBottom: "8px",
            color: isApplyCreditPressed === true ? "black" : "white",
            backgroundColor:
              isApplyCreditPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          Apply for credit card
        </Button>
        <Button
          variant={isPayCreditPressed === true ? "contained" : "outlined"}
          onClick={() => {
            setIsPayCreditPressed(true);
            setIsApplyCreditPressed(false);
          }}
          sx={{
            border: "none",
            marginRight: "8px",
            marginBottom: "8px",
            color: isPayCreditPressed === true ? "black" : "white",
            backgroundColor:
              isPayCreditPressed === true ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          Pay
        </Button>
      </div>
      {isApplyCreditPressed && (
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
            onSubmit={formikApplyCredit.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="creditLimit"
                  label="Credit Limit"
                  value={formikApplyCredit.values.creditLimit}
                  onChange={formikApplyCredit.handleChange}
                  onBlur={formikApplyCredit.handleBlur}
                  error={
                    formikApplyCredit.touched.creditLimit &&
                    formikApplyCredit.errors.creditLimit
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyCredit.touched.creditLimit &&
                    formikApplyCredit.errors.creditLimit
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
                  name="interestRate"
                  label="Interest Rate"
                  value={formikApplyCredit.values.interestRate}
                  onChange={formikApplyCredit.handleChange}
                  onBlur={formikApplyCredit.handleBlur}
                  error={
                    formikApplyCredit.touched.interestRate &&
                    formikApplyCredit.errors.interestRate
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyCredit.touched.interestRate &&
                    formikApplyCredit.errors.interestRate
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
                  name="customer"
                  label="Username"
                  value={formikApplyCredit.values.customer}
                  onChange={formikApplyCredit.handleChange}
                  onBlur={formikApplyCredit.handleBlur}
                  error={
                    formikApplyCredit.touched.customer &&
                    formikApplyCredit.errors.customer
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyCredit.touched.customer &&
                    formikApplyCredit.errors.customer
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
                  name="accountId"
                  label="Account ID"
                  value={formikApplyCredit.values.accountId}
                  onChange={formikApplyCredit.handleChange}
                  onBlur={formikApplyCredit.handleBlur}
                  error={
                    formikApplyCredit.touched.accountId &&
                    formikApplyCredit.errors.accountId
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyCredit.touched.accountId &&
                    formikApplyCredit.errors.accountId
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
                  onClick={() => formikApplyCredit.resetForm()}
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
                    setIsApplyCreditPressed(false);
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
      {isPayCreditPressed && (
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
            onSubmit={formikPayCredit.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="cardNumber"
                  label="Card Number"
                  value={formikPayCredit.values.cardNumber}
                  onChange={formikPayCredit.handleChange}
                  onBlur={formikPayCredit.handleBlur}
                  error={
                    formikPayCredit.touched.cardNumber &&
                    formikPayCredit.errors.cardNumber
                      ? true
                      : false
                  }
                  helperText={
                    formikPayCredit.touched.cardNumber &&
                    formikPayCredit.errors.cardNumber
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
                  value={formikPayCredit.values.amount}
                  onChange={formikPayCredit.handleChange}
                  onBlur={formikPayCredit.handleBlur}
                  error={
                    formikPayCredit.touched.amount &&
                    formikPayCredit.errors.amount
                      ? true
                      : false
                  }
                  helperText={
                    formikPayCredit.touched.amount &&
                    formikPayCredit.errors.amount
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
                  onClick={() => formikPayCredit.resetForm()}
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
                    setIsPayCreditPressed(false);
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
      {isMakePaymentCreditPressed && (
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
            onSubmit={formikPayCredit.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="cardNumber"
                  label="Card Number"
                  value={formikMakePaymentCredit.values.cardNumber}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
                  error={
                    formikMakePaymentCredit.touched.cardNumber &&
                    formikMakePaymentCredit.errors.cardNumber
                      ? true
                      : false
                  }
                  helperText={
                    formikMakePaymentCredit.touched.cardNumber &&
                    formikMakePaymentCredit.errors.cardNumber
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
                  value={formikMakePaymentCredit.values.amount}
                  onChange={formikMakePaymentCredit.handleChange}
                  onBlur={formikMakePaymentCredit.handleBlur}
                  error={
                    formikMakePaymentCredit.touched.amount &&
                    formikMakePaymentCredit.errors.amount
                      ? true
                      : false
                  }
                  helperText={
                    formikMakePaymentCredit.touched.amount &&
                    formikMakePaymentCredit.errors.amount
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
                  onClick={() => formikMakePaymentCredit.resetForm()}
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
                    setIsMakePaymentCreditPressed(false);
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
      {/* Conditionally render the tables based on user role */}
      {userType === "CUSTOMER" ? customerTable : adminTable}
      {isApplyCreditPressed == false && 
      isMakePaymentCreditPressed == false && 
      isPayCreditPressed == false && (
          <img src={dashboardImage} alt="Dashboard image" />
        )}
    </div>
  );
};
export default CreditCard;
