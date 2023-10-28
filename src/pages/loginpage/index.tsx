"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };
  useEffect(() => {
    if (user.email !== "") {
      router.push("/dashboardpage");
    }
  }, [user]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
