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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { giftCards } from "../../Assets/data/enums";

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

const GiftCard = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isApplyGiftPressed, setIsApplyGiftPressed] = useState(false);
  
  const [userType, setUserType] = useState("");
  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");
  const token = localStorage.getItem("token");

  const giftValues = {
    customer: "",
    giftCardType: "",
    amount: "",
    accountId: "",
  };

  const validationSchemaGift = Yup.object({
    cutsomer: Yup.string().required("Please enter an email address").email("Wring email formats"),
    giftCardType: Yup.string().required("Please choose a Gift Card"),
    amount: Yup.number().required("Please enter the payment amount"),
    accountId: Yup.string().required("Please enter an account ID")
  });
  
  const applyGift = (values) => {
    setIsSubmitDisabled(true);
    axios
      .post("http://localhost:8086/gift-cards/purchase", values, {
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

  const formikApplyGift = useFormik({
    initialValues: giftValues,
    onSubmit: (values) => applyGift(values),
    validationSchema: validationSchemaGift,
  });

  // useEffect(() => {
  //   // Retrieve email and token from local storage
  //   const email = localStorage.getItem("email");
  //   const token = localStorage.getItem("token");

  //   // Call the API using the retrieved email and token
  //   axios.get(`http://localhost:8086/gift-cards`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     withCredentials: true,
  //   })
  //     .then((response) => response.data)
  //     .then((data) => {
  //       // Update the state with the API response
  //       tableData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, []);

  useEffect(() => {
    // Retrieve email and token from local storage
    const email = localStorage.getItem("email");

    // Simulating API call by setting static data
    const apiData = [
      {
        id: 1,
        accountID: 123456,
        giftCardType: "Amazon",
        Amount: 500,
      },
      // Add more data here...
    ];

    // Simulating the user type based on the role
    const role = "Admin";

    // Update the state with the static data and user type
    setApiData(apiData);
    setUserTypes(role);
  }, []);

  const [apiData, setApiData] = useState([
    {
      id: 1,
      accountID: 123456,
      giftCardType: "Amazon",
      Amount: 500,
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
            <TableCell sx={headerCellStyle}>Gift Card Type</TableCell>
            <TableCell sx={headerCellStyle}>Amount(Rs.)</TableCell>
            <TableCell sx={headerCellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={cellStyle}>{item.id}</TableCell>
              <TableCell sx={cellStyle}>{item.accountID}</TableCell>
              <TableCell sx={cellStyle}>{item.giftCardType}</TableCell>
              <TableCell sx={cellStyle}>{item.Amount}</TableCell>
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
      label: "Gift Card",
      value: "Amazon",
    },
    {
      label: "Amount",
      value: "500",
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
          variant={isApplyGiftPressed === 1 ? "contained" : "outlined"}
          onClick={() => setIsApplyGiftPressed(true)}
          sx={{
            border: "none",
            marginRight: "8px",
            marginBottom: "8px",
            color: isApplyGiftPressed === 1 ? "black" : "white",
            backgroundColor: isApplyGiftPressed === 1 ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          {/* Welcome {userType === "Admin" ? "Admin" : "Customer"} */}
          Get a Gift Card
        </Button>
      </div>
      {isApplyGiftPressed && (
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
            onSubmit={formikApplyGift.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="customer"
                  label="Email"
                  value={formikApplyGift.values.customer}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
                  error={
                    formikApplyGift.touched.customer &&
                    formikApplyGift.errors.customer
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyGift.touched.customer &&
                    formikApplyGift.errors.customer
                  }
                  InputProps={{
                    style: { color: "antiquewhite" },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="giftCard-label" sx={{ color: "white" }}>
                    Gift Card
                  </InputLabel>
                  <Select
                    labelId="account"
                    id="giftCardType"
                    name="giftCardType"
                    value={formikApplyGift.values.giftCardType}
                    onChange={formikApplyGift.handleChange}
                    error={
                      formikApplyGift.touched.giftCardType &&
                      Boolean(formikApplyGift.errors.giftCardType)
                    }
                    inputProps={{
                      style: { color: "white" },
                    }}
                  >
                    {Object.values(giftCards).map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  name="amount"
                  label="Amount"
                  value={formikApplyGift.values.amount}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
                  error={
                    formikApplyGift.touched.amount &&
                    formikApplyGift.errors.amount
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyGift.touched.amount &&
                    formikApplyGift.errors.amount
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
                  value={formikApplyGift.values.accountId}
                  onChange={formikApplyGift.handleChange}
                  onBlur={formikApplyGift.handleBlur}
                  error={
                    formikApplyGift.touched.accountId &&
                    formikApplyGift.errors.accountId
                      ? true
                      : false
                  }
                  helperText={
                    formikApplyGift.touched.accountId &&
                    formikApplyGift.errors.accountId
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
                  onClick={() => formikApplyGift.resetForm()}
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
                    setIsApplyGiftPressed(false);
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
    </div>
  );
};
export default GiftCard;
