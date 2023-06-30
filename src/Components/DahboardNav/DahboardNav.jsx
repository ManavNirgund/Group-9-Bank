import React from "react";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";

import { tableData } from "../../Assets/data/table";

import "./DashboardNav.css";
import { useState } from "react";

const tableStyle = {
  minWidth: '650px',
};

const DahboardNav = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  // const [tableData, setTableData] = useState([]);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    // addToTable(buttonId);
    console.log(buttonId, ": clicked");
  };

  return (
    <div>
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
          Customer
        </Button>
        <Button
          variant={selectedButton === 2 ? "contained" : "outlined"}
          onClick={() => handleButtonClick(2)}
          sx={{
            border: "none",
            marginRight: "8px",
            marginBottom: "8px",
            color: selectedButton === 2 ? "black" : "white",
            backgroundColor: selectedButton === 2 ? "antiquewhite" : "inherit",
            "&:hover": {
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "white",
            },
          }}
        >
          Manager
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={tableStyle} aria-label="Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address </TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Aadhar Number</TableCell>
              <TableCell>Pan Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.dateOfBirth}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.aadharNumber}</TableCell>
                <TableCell>{item.panNumber}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DahboardNav;
