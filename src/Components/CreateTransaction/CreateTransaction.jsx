import React from "react";
import * as Yup from "yup";
import { account } from "../../Assets/data/enums";
import { Box, Grid, TextField, Container, Button } from "@mui/material";
import { useFormik } from "formik";

const CreateTransaction = () => {
  const initialValues = {
    email: "",
    accountNumber: "",
    accountType: account.SAVINGS,
  };

  const onSubmit = (values) => {
    console.log("values: ", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your email id")
      .email("An email does not look like this"),
    accountNumber: Yup.string().required("Please enter an account number"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => onSubmit(values),
    validationSchema: validationSchema,
  });

  return (
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
      onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: { color: "antiquewhite" },
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
              <Button variant="outlined" color="primary"> Create </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Button variant="outlined" color="warning"> Clear </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Button variant="outlined" color="error" onClick={() => {}}> Cancel </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateTransaction;
