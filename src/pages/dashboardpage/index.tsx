"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";

import Router, { useRouter } from "next/router";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [localEmail, setLocalEmail] = useState("");
  console.log(user);
  const router = useRouter();
  const logoutSubmit = (e: any) => {
    e.preventDefault();
    logout();
    router.push("/loginpage");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window.innerHeight", window.innerHeight);
    }
    setLocalEmail(JSON.stringify(window.localStorage.getItem("email")));

    // window.localStorage?.getItem("email");
  }, []);
  console.log("localEmail27", localEmail);
  console.log(localEmail === JSON.stringify("user@gmail.com"));
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>

      {localEmail == JSON.stringify("user@gmail.com") ? (
        <UserDashboard />
      ) : localEmail == JSON.stringify("admin@gmail.com") ? (
        <AdminDashboard />
      ) : (
        ""
      )}
      <button onClick={logoutSubmit}>logout</button>
    </div>
  );
};

export default Dashboard;
