"use client";
import React, { useEffect, useState } from "react";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import useProtectedRoute from "@/components/AuthRoute/protectRoute";

const Dashboard = () => {
  useProtectedRoute();
  const [localEmail, setLocalEmail] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window.innerHeight", window.innerHeight);
    }
    setLocalEmail(JSON.stringify(window.localStorage.getItem("email")));
  }, []);

  return (
    <div>
      {localEmail == JSON.stringify("user@gmail.com") ? (
        <UserDashboard />
      ) : localEmail == JSON.stringify("admin@gmail.com") ? (
        <AdminDashboard />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
