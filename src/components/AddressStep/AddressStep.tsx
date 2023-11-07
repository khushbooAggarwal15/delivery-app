"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { useAuth } from "@/utils/auth";

interface AddressForm {
  name: string;
  contactnumber: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  contactnumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid contact number")
    .required("Contact number is required"),
  address1: yup.string().required("Address line 1 is required"),
  address2: yup.string().required("Address line 2 is required"),
  landmark: yup.string().required("Landmark is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .matches(/^[0-9]{5}$/, "Invalid ZIP code")
    .required("ZIP code is required"),
  country: yup.string().required("Country is required"),
});

export default function AddresStep({ setactiveStep, activeStep }: any) {
  const { addressData } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log("data", data);
    addressData(data);

    setactiveStep(activeStep + 1);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.name?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="contactnumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="contactnumber"
                  name="contactnumber"
                  label="Contact Number"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.contactnumber?.message}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="address1"
                  name="address1"
                  label="Flat, House no., Building, Company, Apartment"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.address1?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="address2"
                  name="address2"
                  label="Area, Street, Sector, Village"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.address2?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="landmark"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="landmark"
                  name="landmark"
                  label="Landmark"
                  fullWidth
                  autoComplete="shipping landmark"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.landmark?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.city?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="state"
                  name="state"
                  label="State"
                  fullWidth
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.state?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="zip"
                  name="zip"
                  label="Pincode"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.zip?.message}
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              )}
            />
            <p style={{ color: "red", height: "14px", fontStyle: "italic" }}>
              {errors?.country?.message}
            </p>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
            marginLeft: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1, justifyContent: "flex-end" }}
          >
            Next
          </Button>
        </Box>
      </form>
    </>
  );
}
