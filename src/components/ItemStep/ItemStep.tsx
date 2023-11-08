import { useAuth } from "@/utils/auth";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";

interface IData {
  message: {
    intent: {
      category: {
        id: string;
      };
      name: string;
      cost: string;
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

        dangerous_goods: string;
      };
    };
  };
}

interface IAddress {
  name: string;
  contactnumber: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
interface ITransaction {
  transaction_id: string;
}

const ItemStep = () => {
  const [loading, setLoading] = useState(false);
  const { formData } = useAuth();
  const storedData = window.localStorage.getItem("newdata");
  const addressData = window.localStorage.getItem("address");
  const transactionData = window.localStorage.getItem("transaction_id");
  const data: IData = storedData ? JSON.parse(storedData) : null;
  console.log("data", data);
  const data1: IAddress = addressData ? JSON.parse(addressData) : null;
  // console.log(data1);
  const email = window.localStorage.getItem("email");
  // console.log("data" + JSON.stringify(data));
  const route = useRouter();

  const handleClick = () => {
    setLoading(true);
    const combinedData = {
      data: data,
      data1: data1,
      data2: transactionData,
      email: email,
    };

    console.log(combinedData);
    formData(combinedData);
    route.push("/dashboardpage");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={data?.message?.intent?.payload_details?.category}
            secondary={data?.message?.intent?.category?.id}
          />
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{data1?.name}</Typography>
          <Typography gutterBottom>{data1?.address1}</Typography>
          <Typography gutterBottom>
            {data1?.address2}, {data1?.landmark}
          </Typography>
          <Typography gutterBottom>
            {data1?.city}, {data1?.state} , {data1?.zip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Transaction
          </Typography>
          <Grid container>
            <Typography gutterBottom>{transactionData}</Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
         
        </Typography> */}

      <Typography gutterBottom>{transactionData}</Typography>
      {/* </Grid> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 3,
          marginLeft: 1,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, ml: 1, justifyContent: "flex-end" }}
          onClick={handleClick}
        >
          Confirm Order
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ItemStep;
