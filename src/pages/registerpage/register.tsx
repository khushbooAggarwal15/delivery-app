import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function App() {
  const route = useRouter();
  const { handleSubmit, control } = useForm();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    route.push("./loginpage");
  };

  return (
    <>
      <h1> Regsiter Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div> Gmail</div>
        <br />
        <Controller
          control={control}
          name="firstname"
          render={({ field }) => (
            <TextField {...field} value={email} onChange={handleChange} />
          )}
        />

        <div> Password </div>
        <br />
        <Controller
          control={control}
          name="lastname"
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

        <button> Register </button>
      </form>
    </>
  );
}
