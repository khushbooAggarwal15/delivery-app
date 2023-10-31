import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase";

export default function App() {
  const auth = getAuth(app);
  const route = useRouter();
  const { handleSubmit, control } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log();
      route.push("/loginpage");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Email</div>
        <br />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField {...field} value={email} onChange={handleChange} />
          )}
        />

        <div>Password</div>
        <br />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              type="password"
              {...field}
              value={password}
              onChange={handleChange}
            />
          )}
        />
        <br />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </>
  );
}
