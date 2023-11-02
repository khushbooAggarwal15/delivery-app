import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./UserDashboard.module.css";
import Link from "next/link";
import Orders from "../Orders/Orders";
import { useAuth } from "../../utils/auth";
import Profiledetails from "@/components/Profiledetails/index";
import { Box, Button, Modal } from "@mui/material";
import OrderForm from "../OrderForm/OrderForm";
import CloseIcon from "@mui/icons-material/Close";
function UserDashboard() {
  const [profileVisisble, setProfileVisibile] = useState(false);
  const [orderVisisble, setorderVisibile] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/createorder");
  };
  const handleProfile = () => {
    setProfileVisibile(true);
    setorderVisibile(false);
  };
  const handleOrder = () => {
    setorderVisibile(true);
    setProfileVisibile(false);
  };
  const { user, logout } = useAuth();
  const logoutSubmit = (e: any) => {
    e.preventDefault();
    logout();
    router.push("/loginpage");
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflow: "auto",
    borderRadius: "30px",
  };
  return (
    <>
      <Button onClick={handleOpen}>Create Order</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleClose} />
          <OrderForm setOpen={setOpen} />
        </Box>
      </Modal>
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
