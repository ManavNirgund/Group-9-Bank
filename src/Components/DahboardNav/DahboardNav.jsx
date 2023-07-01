import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table
} from "@mui/material";
// import { Table } from "react-bootstrap";

import "./DashboardNav.css";
import axios from "axios";
const tableStyle = {
  minWidth: '650px',
  borderCollapse: 'collapse',
};

const cellStyle = {
  border: '1px solid black',
  padding: '8px',
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: 'lightgray',
};

const DashboardNav = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [userType, setUserType] = useState("");

  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");


  useEffect(() => {
    // Retrieve email and token from local storage
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    // Call the API using the retrieved email and token
    axios.get(`http://localhost:8080/user/email/${email}`, {
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
        // setUserType(data.authorities[0].authority);
        setUserType("CUSTOMER")
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
        id: 1,
        fromAccount: "Account A",
        toAccount: "Account B",
        amount: 100,
        type: "Transfer",
        status: "Pending",
        createdAt: "2023-06-29",
      },
      // Add more data here...
    ];

    // Simulating the user type based on the role
    const role = "CUSTOMER";

    // Update the state with the static data and user type
    setApiData(apiData);
    setUserTypes(role);
  }, []);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    console.log(buttonId, ": clicked");
  };

  const [apiData, setApiData] = useState([
    {
      id: 1,
      fromAccount: "Account A",
      toAccount: "Account B",
      amount: 100,
      type: "Transfer",
      status: "Pending",
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
            <TableCell sx={headerCellStyle}>From Account</TableCell>
            <TableCell sx={headerCellStyle}>To Account</TableCell>
            <TableCell sx={headerCellStyle}>Amount</TableCell>
            <TableCell sx={headerCellStyle}>Type</TableCell>
            <TableCell sx={headerCellStyle}>Status</TableCell>
            <TableCell sx={headerCellStyle}>Created At</TableCell>
            <TableCell sx={headerCellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={cellStyle}>{item.id}</TableCell>
              <TableCell sx={cellStyle}>{item.fromAccount}</TableCell>
              <TableCell sx={cellStyle}>{item.toAccount}</TableCell>
              <TableCell sx={cellStyle}>{item.amount}</TableCell>
              <TableCell sx={cellStyle}>{item.type}</TableCell>
              <TableCell sx={cellStyle}>{item.status}</TableCell>
              <TableCell sx={cellStyle}>{item.createdAt}</TableCell>
              <TableCell sx={cellStyle}>
                {/* <Button variant="outlined" sx={{ backgroundColor: "#FFC107", color: "#000" }}> */}
                <Button variant="contained" color="warning">
                  Edit
                </Button>{" "}
                {/* <Button variant="outlined" sx={{ backgroundColor: "#DC3545", color: "#000" }}> */}
                <Button variant="contained" color="error">
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
      label: "Trans ID",
      value: "1C8451A",
    },
    {
      label: "To Account",
      value: "7895410",
    },
    {
      label: "Amount",
      value: "10000",
    },
    {
      label: "Status",
      value: "Sucessfull",
    },
    {
      label: "Type",
      value: "Debit",
    },
    {
      label: "Created At",
      value: "30/06/2023",
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
          variant={selectedButton === 1 ? "contained" : "outlined"}
          onClick={() => handleButtonClick(1)}
          sx={{
            border: "none",
            marginRight: "8px",
            marginBottom: "8px",
            color: selectedButton === 1 ? "black" : "white",
            backgroundColor: selectedButton === 1 ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          {/* Welcome {userType === "Admin" ? "Admin" : "Customer"} */}
          {/* Welcome {userType === "CUSTOMER" ? firstName : "Admin"} */}
          
        </Button>
      </div>
      {/* Conditionally render the tables based on user role */}
      {userType === "CUSTOMER" ? customerTable : adminTable}
    </div>
  );
};

export default DashboardNav;
