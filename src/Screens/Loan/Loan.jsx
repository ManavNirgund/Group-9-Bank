import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import dashboardImage from "../../Assets/Images/dashboard.svg";
import { account } from "../../Assets/data/enums";
// import { Table } from "react-bootstrap";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

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
const Loan = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isCreateLoanPressed, setIsCreateLoanPressed] = useState(false);
  const [isSigninDisabled, setIsSigninDisabled] = useState(false);
  const [tableData, setTableableData] = useState();

  const [userType, setUserType] = useState("");
  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");

  const name = localStorage.getItem("name");

  // useEffect(() => {
  //  axios.get("http:localhost:8082/loans/status ", {
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
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, [])

  const initialValues = {
    userName: "",
    loanAmount: "",
    purpose: "",
  };

  const postUserLoan = (values) => {
    setIsSigninDisabled(true);
    const valuesWithId = {
      ...values,
      id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 999999
    }
    console.log("valuesWithId: ", valuesWithId)
    axios
      .post("http://localhost:8082/loans/apply", valuesWithId, {
        headers: {
          "Content-Type": "application.json",
        },
      })
      .then((res) => {
        setIsSigninDisabled(false);
        alert(
          `Your application for a ${formik.values.loanAmount} has been submitted successfully!`
        );
        console.log("response", res.data);
      });
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Please enter your Username"),
    loanAmount: Yup.string().required("Please enter an amount you wish"),
    purpose: Yup.string().required("Please enter the purpose of your loan")
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => postUserLoan(values),
    validationSchema: validationSchema,
  });

  useEffect(() => {
    // Retrieve email and token from local storage
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    // Call the API using the retrieved email and token
    axios
      .get(`http://localhost:8080/user/email/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        // Update the state with the API response
        setFirstName(data.firstname);
        setUserType(data.authorities[0].authority);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  useEffect(() => {
    // Retrieve email and token from local storage
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    // Simulating API call by setting static data
    const apiData = [
      {
        name: "Diya",
        loanAmount: "12333",
        status: "Approved",
        interest: "7%",
        tenure: "1Y",
        collatre: "0",
        creditCard: "Yes",
        emi: "Yes",
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi: "",
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi: "",
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi: "",
      },
    ];

    // Simulating the user type based on the role
    const role = "Admin";

    // Update the state with the static data and user type
    setApiData(apiData);
    setUserTypes(role);
  }, []);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  const [apiData, setApiData] = useState([
    {
      name: "",
      loanAmount: "",
      status: "",
      interest: "",
      tenure: "",
      collatre: "",
      creditCard: "",
      emi: "",
    },
    {
      name: "",
      loanAmount: "",
      status: "",
      interest: "",
      tenure: "",
      collatre: "",
      creditCard: "",
      emi: "",
    },
    {
      name: "",
      loanAmount: "",
      status: "",
      interest: "",
      tenure: "",
      collatre: "",
      creditCard: "",
      emi: "",
    },
    {
      name: "",
      loanAmount: "",
      status: "",
      interest: "",
      tenure: "",
      collatre: "",
      creditCard: "",
      emi: "",
    },
  ]);
  const adminTable = (
    <TableContainer component={Paper} sx={{ backgroundColor: "#D9D9D9" }}>
      <Table sx={tableStyle} aria-label="Table">
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellStyle}>Name</TableCell>
            <TableCell sx={headerCellStyle}>Loan Amount</TableCell>
            <TableCell sx={headerCellStyle}>Staus</TableCell>
            <TableCell sx={headerCellStyle}>Interest</TableCell>
            <TableCell sx={headerCellStyle}>Tenure</TableCell>
            <TableCell sx={headerCellStyle}>Collateral requireds</TableCell>
            <TableCell sx={headerCellStyle}>Credit Check Required</TableCell>
            <TableCell sx={headerCellStyle}>EMI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={cellStyle}>{item.name}</TableCell>
              <TableCell sx={cellStyle}>{item.loanAmount}</TableCell>
              <TableCell sx={cellStyle}>{item.status}</TableCell>
              <TableCell sx={cellStyle}>{item.interest}</TableCell>
              <TableCell sx={cellStyle}>{item.tenure}</TableCell>
              <TableCell sx={cellStyle}>{item.collatre}</TableCell>
              <TableCell sx={cellStyle}>{item.creditCard}</TableCell>
              <TableCell sx={cellStyle}>{item.emi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  const customerTableData = [
    {
      label: "Loan ID",
      value: "1",
    },
    {
      label: "Loan Amount",
      value: "$10,000",
    },
    {
      label: "Purpose",
      value: "Home Loan",
    },
    {
      label: "Tenure",
      value: "5 years",
    },
    {
      label: "EMI",
      value: "$200",
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
        {/* Welcome {userType === "Admin" ? "Admin" : "Customer"} */}
        {/* Welcome {userType === "CUSTOMER" ? firstName : "Admin"} */}
        <Typography color="beige" variant="h5">
          Welcome {name}
        </Typography>
      </div>
      <Button
        variant={selectedButton === 1 ? "contained" : "outlined"}
        onClick={() => {
          handleButtonClick(1);
          setIsCreateLoanPressed(true);
        }}
        sx={{
          border: "none",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginRight: "8px",
          color: selectedButton === 1 ? "black" : "white",
          fontSize: "1rem",
          backgroundColor: selectedButton === 1 ? "antiquewhite" : "inherit",
          "&:hover": {
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
          },
        }}
      >
        Apply for Loan
      </Button>
      {isCreateLoanPressed && (
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "-2rem",
            marginBottom: "1rem",
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
                  type="text"
                  variant="filled"
                  name="userName"
                  label="User Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.userName && formik.errors.userName
                      ? true
                      : false
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  variant="filled"
                  name="loanAmount"
                  label="Amount"
                  value={formik.values.loanAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.loanAmount && formik.errors.loanAmount
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.loanAmount && formik.errors.loanAmount
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  variant="filled"
                  name="purpose"
                  label="Purpose"
                  value={formik.values.purpose}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.purpose && formik.errors.purpose
                      ? true
                      : false
                  }
                  helperText={formik.touched.purpose && formik.errors.purpose}
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              {/* <Grid item xs={12}>
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
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={isSigninDisabled}
                >
                  {isSigninDisabled ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Create"
                  )}
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
                    handleButtonClick(0);
                    setIsCreateLoanPressed(false);
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

      {isCreateLoanPressed == false && (
          <img src={dashboardImage} alt="Dashboard image" />
        )}
    </div>
  );
};
export default Loan;
