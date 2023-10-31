"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useAuth } from "../../utils/auth";
import styles from "./loginpage.module.css";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function LoginPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };
  const handleClick = () => {
    router.push("/");
  };
  useEffect(() => {
    if (user.email !== "") {
      router.push("/dashboardpage");
    }
  }, [user]);
  return (
    <div className={styles.main}>
      <div style={{ width: "420px" }}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.heading}> Login Form </h1>
          <div className={styles.label}> Email </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input {...field} className={styles.input} />
            )}
          />
          <p className={styles.errormessage}>{errors?.email?.message}</p>

          <div className={styles.label}> Password </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input {...field} className={styles.input} />
            )}
          />
          <p className={styles.errormessage}>{errors?.password?.message}</p>

          <br />
          <button className={styles.button} type="submit">
            Submit
          </button>
          <p className={styles.para}>Don't have account register here</p>
          <button className={styles.button} type="submit" onClick={handleClick}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
