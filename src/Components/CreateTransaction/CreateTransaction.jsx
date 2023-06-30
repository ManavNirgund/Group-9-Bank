import React from 'react';
import * as Yup from 'yup';
import { account } from '../../Assets/data/enums';
import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';

const CreateTransaction = () => {

    const initialValues = {
        email: '',
        accountNumber: '',
        accountType: account.SAVINGS,
    }

    const onSubmit = (values) => {
        console.log("values: ", values)
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Please enter your email id").email("An email does not look like this"),
        accountNumber: Yup.string().required("Please enter an account number")
    })

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => onsubmit(values),
        validationSchema: validationSchema
    })

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        name='email'
                        label='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && formik.errors.email ? true : false
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        InputProps={{
                            style: { color: "antiquewhite" },
                        }}
                    >

                    </TextField>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreateTransaction;