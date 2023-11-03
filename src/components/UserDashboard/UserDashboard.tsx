import { useRouter } from "next/router";
import React, { useState } from "react";
import Orders from "../Orders/Orders";
import { useAuth } from "../../utils/auth";
import Profiledetails from "@/components/Profiledetails/index";
import {
  Button,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Box,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Modal } from "@mui/material";
import OrderForm from "../OrderForm/OrderForm";
import CloseIcon from "@mui/icons-material/Close";
import DetailsForm from "../DetailsForm/DetailsForm";
const drawerWidth = 240;
interface FormSchema {
  message: {
    intent: {
      category: {
        id: string;
      };

      fulfillment: {
        fulfillment_type: string;
        start: {
          location: {
            gps: string;
            address: {
              area_code: string;
            };
          };
        };
        end: {
          location: {
            gps: string;
            address: {
              area_code: string;
            };
          };
        };
      };

      payload_details: {
        weight: {
          unit: string;
          value: number;
        };
        dimensions: {
          length: {
            unit: string;
            value: number;
          };
          breadth: {
            unit: string;
            value: number;
          };
          height: {
            unit: string;
            value: number;
          };
        };
        category: string;
        dangerous_goods: boolean;
      };
    };
  };
}
export default function UserDashboard() {
  const [profileVisisble, setProfileVisibile] = useState(false);
  const [orderVisisble, setorderVisibile] = useState(true);
  const router = useRouter();

  // const handleClick = () => {
  //   router.push("/createorder");
  // };
  const handleProfile = () => {
    setProfileVisibile(true);
    setorderVisibile(false);
  };
  const handleOrder = () => {
    setorderVisibile(true);
    setProfileVisibile(false);
  };
  const { user, logout } = useAuth();

  const logoutsubmit = (e: any) => {
    e.preventDefault();
    logout();
    router.push("/loginpage");
  };
  const [formDetails, setFormDetails] = useState<FormSchema[]>([]);
  const [open, setOpen] = useState(false);
  const [opendetails, setOpenDetails] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setOpenDetails(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpenDetails(false);
  };

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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sky-blue Dart
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <div>
            <ListSubheader component="div" id="My Dashboard">
              My Dashboard
            </ListSubheader>
            <ListItemButton onClick={handleProfile}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>

            <ListItemButton onClick={handleOrder}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="All Orders" />
            </ListItemButton>

            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>

              <ListItemText primary="Create Order" />
            </ListItemButton>

            {open ? (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CloseIcon onClick={handleClose} />

                  <OrderForm
                    setOpen={setOpen}
                    setOpenDetails={setOpenDetails}
                    setFormDetails={setFormDetails}
                  />
                </Box>
              </Modal>
            ) : opendetails ? (
              <Modal
                open={opendetails}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CloseIcon onClick={handleClose1} />
                  <DetailsForm
                    setOpenDetails={setOpenDetails}
                    formDetails={formDetails}
                  />
                </Box>
              </Modal>
            ) : (
              ""
            )}
          </div>

          <div className="button-wrapper">
            <Button variant="contained" onClick={logoutsubmit}>
              Log Out
            </Button>
          </div>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <div>{profileVisisble && <Profiledetails />}</div>

        <div>{orderVisisble && <Orders />}</div>
      </Box>
    </Box>
  );
}
