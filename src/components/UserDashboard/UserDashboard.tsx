import { useRouter } from "next/router";
import React from "react";

function UserDashboard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/createorder");
  };
  return (
    <>
      <button onClick={handleClick}>Create Order</button>
    </>
  );
}

export default UserDashboard;
