"use client";
import React from "react";
import { useAuth } from "../../utils/auth";
import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard/TeacherDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && user.role === "teacher" && <TeacherDashboard />}
      {user && user.role === "student" && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
