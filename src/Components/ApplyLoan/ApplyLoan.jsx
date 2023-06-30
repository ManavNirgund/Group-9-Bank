import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const ApplyLoan = () => {

    const initialValues = {
        userName: '',
        loanAmount: '',
        purpose: '',
        creditCheckRequired: '',
        collateralRequired:'',
    }

    const onSubmit = (values) => {
        console.log("values: ", values)
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required("Please enter your username.").min(3, "Username must be atleast 3 letters long"),
        loanAmount: Yup.string().required("Please enter the Loan Amount"),
        purpose: Yup.string().required("Please enter the purpose of your loan"),
    });

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => onSubmit(values),
        validationSchema: validationSchema,
    })
}

export default ApplyLoan;