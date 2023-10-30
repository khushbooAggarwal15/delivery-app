"use client";
import React from "react";
import { useAuth } from "../../utils/auth";

import Router, { useRouter } from "next/router";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log(user);
  const router = useRouter();
  const logoutSubmit = (e: any) => {
    e.preventDefault();
    logout();
    router.push("/loginpage");
  };
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && user.role === "user" && <UserDashboard />}
      {user && user.role === "admin" && <AdminDashboard />}
      <button onClick={logoutSubmit}>logout</button>
    </div>
  );
};

export default Dashboard;
