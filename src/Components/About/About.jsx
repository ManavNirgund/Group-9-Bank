import React from "react";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { products } from "../../Assets/data/enums";
import { Link } from "react-router-dom";
import { socials } from "../../Assets/data/enums";
import Footer from "../Footer/Footer";
import { appName } from "../../Assets/data/enums";

const About = () => {
  return (
    <Box
      component="footer"
      color="white"
      py={3}
      sx={{
        color: "white",
        py: 3,
        textAlign: "center",
        backgroundColor: "rgb(135, 0, 64)",
      }}
      id="about"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            color="white"
            sx={{
              marginBottom: "10px",
            }}
          >
            About
          </Typography>

          <Typography variant="body2" color="antiquewhite">
            {appName.title} is a leading digital bank that prioritizes convenience
            and security. With a strong emphasis on digital technology, we offer
            online and mobile banking services, ensuring a seamless and
            efficient banking experience for our customers. Our goal is to
            empower individuals and businesses with innovative digital solutions
            that meet their financial needs effectively.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            color="white"
            sx={{
              marginBottom: "10px",
            }}
          >
            Useful Links
            {products.map((item) => {
              return (
                <Typography
                  key={item.id}
                  variant="body2"
                  sx={{ marginTop: "5px" }}
                >
                  <Link to={item.to} style={{ color: "antiquewhite" }}>
                    {item.name}
                  </Link>
                </Typography>
              );
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            color="white"
            sx={{
              marginBottom: "10px",
            }}
          >
            Socials
          </Typography>
          {socials.map((item) => {
            return (
              <Link
                to={item.url}
                target="_blank"
                style={{
                  display: "inline",
                  marginLeft: "10px",
                  color: "antiquewhite",
                }}
              >
                {item.icon}
              </Link>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
