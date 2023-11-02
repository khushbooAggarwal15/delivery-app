"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";

import { useRouter } from "next/router";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import useProtectedRoute from "@/components/AuthRoute/protectRoute";

const Dashboard = () => {
  useProtectedRoute();

  const { user, logout } = useAuth();
  const [localEmail, setLocalEmail] = useState("");
  const router = useRouter();

  // const logoutSubmit = (e: any) => {
  //   e.preventDefault();
  //   logout();
  //   router.push("/");
  // };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window.innerHeight", window.innerHeight);
    }
    setLocalEmail(JSON.stringify(window.localStorage.getItem("email")));

    // window.localStorage?.getItem("email");
  }, []);
  // console.log(localEmail === JSON.stringify("user@gmail.com"));
  return (
    <div>
      {/* <h1>Welcome to the Dashboard</h1> */}

      {localEmail == JSON.stringify("user@gmail.com") ? (
        <UserDashboard />
      ) : localEmail == JSON.stringify("admin@gmail.com") ? (
        <AdminDashboard />
      ) : (
        ""
      )}
      {/* <button onClick={logoutSubmit}>logout</button> */}
    </div>
  );
};

export default Dashboard;
// export default Dashboard;
