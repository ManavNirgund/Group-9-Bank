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
} from "@mui/material";

import "./DashboardNav.css";
import axios from "axios";
import dashboardImage from "../../Assets/Images/dashboard.svg";

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

const DashboardNav = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [userType, setUserType] = useState("");

  const [userTypes, setUserTypes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [transaction, setTransaction] = useState(null);

  // useEffect(() => {
  //   // Retrieve email and token from local storage
  //   const email = localStorage.getItem("email");
  //   const token = localStorage.getItem("token");

  //   // Call the API using the retrieved email and token
  //   axios.get(`http://localhost:8080/user/email/${email}`, {
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
  //       // setUserType(data.authorities[0].authority);
  //       setUserType("CUSTOMER")
  //     })

  //     .catch((error) => {
  //       console.error("Error fetching API data:", error);
  //     });
  // }, []);


  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    console.log(buttonId, ": clicked");
  };

  return (
    <div className="tabless">
      {/* Conditionally render the tables based on user role */}
      {/* {userType === "CUSTOMER" ? customerTable : adminTable} */}

      {transaction && (
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
                <TableCell sx={headerCellStyle}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.map((item) => (
                <TableRow key={item.id}>
                  {console.log(item.id)}
                  <TableCell sx={cellStyle}>{item.id}</TableCell>
                  <TableCell sx={cellStyle}>{item.accountNumber}</TableCell>
                  <TableCell sx={cellStyle}>{item.accountType}</TableCell>
                  <TableCell sx={cellStyle}>{item.balance}</TableCell>
                  <TableCell sx={cellStyle}>{item.createdAt}</TableCell>
                  <TableCell sx={cellStyle}>{item.email}</TableCell>
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
      )}
      <img src={dashboardImage} alt="Dashboard Image"/>
    </div>
  );
};

export default DashboardNav;
