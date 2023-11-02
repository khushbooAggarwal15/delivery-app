"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useAuth } from "../../utils/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/utils/firebase";

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

function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });
  const auth = getAuth(app);
  const { login } = useAuth();
  const router = useRouter();

  const defaultTheme = createTheme();

  // const onSubmit = (data: any) => {
  //   console.log(data.email);

  //   login(data.email, data.password);
  //   console.log(window.localStorage.getItem("access_token"));
  //   router.push("/loginpage");
  // };
  const onSubmit = async (data: any) => {
    try {
      if (
        (data.email === "user@gmail.com" && data.password === "user1234") ||
        (data.email === "admin@gmail.com" && data.password === "admin1234")
      ) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
      console.log();
      router.push("/loginpage");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const handleClick = () => {
    router.push("/loginpage");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
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
            Sign Up
          </Typography>
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
            <p style={{ color: "red" }}>{errors?.email?.message}</p>

            <br />
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
            <p style={{ color: "red" }}>{errors?.password?.message}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleClick}>
                  {"Already have account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
