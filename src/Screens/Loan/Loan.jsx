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
  const Loan = () => {
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
          emi:"Yes"
        },
        {
          name: "",
          loanAmount: "",
          status: "",
          interest: "",
          tenure: "",
          collatre: "",
          creditCard: "",
          emi:""
        },
        {
          name: "",
          loanAmount: "",
          status: "",
          interest: "",
          tenure: "",
          collatre: "",
          creditCard: "",
          emi:""
        },
        {
          name: "",
          loanAmount: "",
          status: "",
          interest: "",
          tenure: "",
          collatre: "",
          creditCard: "",
          emi:""
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
      console.log(buttonId, ": clicked");
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
        emi:""
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi:""
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi:""
      },
      {
        name: "",
        loanAmount: "",
        status: "",
        interest: "",
        tenure: "",
        collatre: "",
        creditCard: "",
        emi:""
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
            <TableCell sx={cellStyle}>
              {item.emi}
            </TableCell>
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
          Welcome {userType === "CUSTOMER" ? firstName : "Admin"}
        </Button>
      </div>
      {/* Conditionally render the tables based on user role */}
      {userType === "CUSTOMER" ? customerTable : adminTable}
    </div>
  );
};
export default Loan;