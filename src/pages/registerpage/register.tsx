import { TextField } from "@mui/material";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

export default function App() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <h1> Regsiter Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div> User Name </div>
        <br />
        <Controller
          control={control}
          name="firstname"
          render={({ field }) => <TextField {...field} />}
        />

        <div> Gmail</div>
        <br />
        <Controller
          control={control}
          name="firstname"
          render={({ field }) => <TextField {...field} />}
        />

        <div> Password </div>
        <br />
        <Controller
          control={control}
          name="lastname"
          render={({ field }) => <TextField type="password" {...field} />}
        />
        <br />

        <button> Register </button>
      </form>
    </>
  );
}
