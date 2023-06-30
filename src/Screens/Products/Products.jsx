import React from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "./ProductsItem";
import { items } from "../../Assets/data/enums";

import "./Products.css";

const Products = () => {
  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "1rem",
          marginTop: "1rem",
          color: "antiquewhite",
        }}
      >
        Take a look at arsenal of products!
      </Typography>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          "-ms-overflow-style": "none",
        }}
      >
        {items.map((item) => {
          return (
            <Product key={item.id} component={Link} to={item.to}>
              <CardMedia>{item.icon}</CardMedia>
              <CardContent>{item.name}</CardContent>
            </Product>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
