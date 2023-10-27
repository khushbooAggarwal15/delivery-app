import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

function loginpage() {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    router.push({
      pathname: "/dashboardpage",
      query: { email, password },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default loginpage;
