"use client";
import React from "react";
import { useAuth } from "../../utils/auth";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard/TeacherDashboard";
import Router, { useRouter } from "next/router";

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
      {user && user.role === "teacher" && <TeacherDashboard />}
      {user && user.role === "student" && <StudentDashboard />}
      <button onClick={logoutSubmit}>logout</button>
    </div>
  );
};

export default Dashboard;
