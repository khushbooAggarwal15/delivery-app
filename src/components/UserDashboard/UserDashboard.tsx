import { useRouter } from "next/router";
import React from "react";
import styles from "./UserDashboard.module.css";
import Link from "next/link";
import Orders from "../Orders/Orders";

function UserDashboard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/createorder");
  };
  return (
    <>
      <button className={styles.order} onClick={handleClick}>
        Create Order
      </button>
      <div className={`${styles.sidebar}`}>
        <Link href="/orders">Orders</Link>
        <Link href="">Settings</Link>
      </div>
      <div>
        <Orders />
      </div>
    </>
  );
}

export default UserDashboard;
