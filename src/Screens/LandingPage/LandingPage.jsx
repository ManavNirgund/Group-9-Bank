import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { products } from "../../Assets/data/enums";
import { Link, useLocation } from "react-router-dom";

import bank from "../../Assets/Images/bank.svg";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Product } from "../Products/ProductsItem";
import { appName } from "../../Assets/data/enums";

import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Container fluid className="content-container">
        <Row>
          <Col style={{ backgroundColor: "rgba(233, 236, 239, 0.5)" }}>
            <Typography variant="h3" color="black">
              Welcome to {appName.title}
            </Typography>
            <p className="lead">
              Welcome to Axis Bank, your trusted financial partner for all your
              banking needs. As one of India's leading private sector banks, we
              are committed to providing you with exceptional services,
              innovative solutions, and a seamless banking experience.
            </p>
          </Col>
        </Row>
        {/* <Grid container spacing={5}>
          <Grid item sm={3}>
            <Card>
              <CreditCardIcon/>
              Credit Cards</Card>
          </Grid>
          <Grid item sm={3}>
            <Card>Personal Loan</Card>
          </Grid>
          <Grid item sm={3}>
            <Card>Car Loan</Card>
          </Grid>
          <Grid item sm={3}>
            <Card>Mututal Find SIP</Card>
          </Grid>
        </Grid> */}

        <div
          style={{
            display: "flex",
            overflowX: "scroll",
            msOverflowStyle: "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={bank} width="500vw" height="auto" />
          <Typography
            variant="h4"
            color="black"
            sx={{ textAlign: "left" }}
          >
            {" "}
            Products{" "}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {products.map((item) => {
              return (
                <Product
                  key={item.id}
                  component={Link}
                  to={item.to}
                  className="card"
                >
                  <CardMedia>{item.icon}</CardMedia>
                  <CardContent>
                    <Typography variant="h5" color="black">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Product>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
