import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard/TeacherDashboard";
import React from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const email = router.query.email;
  const password = router.query.password;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {email == "teacher@gmail.com" && password == "teacher" ? (
        <TeacherDashboard />
      ) : email == "student@gmail.com" && password == "student" ? (
        <StudentDashboard />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
