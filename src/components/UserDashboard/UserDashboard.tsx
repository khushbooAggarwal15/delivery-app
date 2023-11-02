import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./UserDashboard.module.css";
import Link from "next/link";
import Orders from "../Orders/Orders";
import { useAuth } from "../../utils/auth";
import Profiledetails from'@/components/Profiledetails/index'

function UserDashboard() {
  const [profileVisisble, setProfileVisibile] = useState(false);
  const [orderVisisble, setorderVisibile] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/createorder");
  };
  const handleProfile = () => {
    setProfileVisibile(true)
    setorderVisibile(false)
  }
  ;
  const handleOrder = () => {
    setorderVisibile(true)
    setProfileVisibile(false)
} 
    ;

  const { user, logout } = useAuth();
  const logoutSubmit = (e: any) => {
    e.preventDefault();
    logout();
    router.push("/loginpage");
  };

  return (
    <>
      <button className={styles.order} onClick={handleClick}>
        Create Order
      </button>
      <div className={`${styles.sidebar}`}>
      <Link onClick={handleProfile} href="">
          Profile
        </Link>
        <Link onClick={handleOrder} href="">
          All Orders
        </Link>
        <button className={styles.logout} onClick={logoutSubmit}>
          logout
        </button>
      </div>
      <div style={{ marginLeft: "290px", display: "flex", paddingTop: "50px" }}>
        {profileVisisble && <Profiledetails />}
      </div>

      <div style={{ marginLeft: "290px", display: "flex", paddingTop: "50px" }}>
        {orderVisisble && <Orders />}
      </div>
    </>
  );
}

export default UserDashboard;
