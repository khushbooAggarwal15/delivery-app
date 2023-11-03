"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/auth";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useProtectedRoute from "@/components/AuthRoute/protectRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

interface IUser {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Please provide a valid password"),
});

function LoginPage() {
  useProtectedRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: IUser) => {
    // e.preventDefault();
    console.log("data", data);
    await login(data.email, data.password);
    console.log(window.localStorage.getItem("access_token"));

    if (window.localStorage.getItem("access_token")) {
      router.push("/dashboardpage");
    } else {
      router.push("/loginpage");
    }
  };

  const handleClick = () => {
    router.push("/registerpage");
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          <p style={{ color: "red", height: "16px" }}>
            {errors?.email?.message}
          </p>

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <p style={{ color: "red", height: "16px" }}>
            {errors?.password?.message}
          </p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {/* <Grid container> */}
          <Grid item>
            <Link href="#" variant="body2">
              {"Forgot password?  "}
            </Link>
          </Grid>
          <Grid container justifyContent="right">
            <Link href="#" variant="body2" onClick={handleClick}>
              {"Don't have an account? Sign Up"}
            </Link>
            {/* </Grid> */}
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default LoginPage;
