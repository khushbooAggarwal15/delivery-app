import { useAuth } from "@/utils/auth";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

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

const ItemStep = () => {
  const { formData } = useAuth();
  const storedData = window.localStorage.getItem("newdata");
  const addressData = window.localStorage.getItem("address");

  const data: IData[] = storedData ? JSON.parse(storedData) : null;
  const data1: IAddress = addressData ? JSON.parse(addressData) : null;
  console.log(data1);
  console.log("data" + JSON.stringify(data));

  const handleClick = () => {
    const combinedData = {
      data: data,
      data1: data1,
    };

    console.log(combinedData);
    formData(combinedData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={data[0]?.message?.intent?.payload_details?.category}
            secondary={data[0]?.message?.intent?.category?.id}
          />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}></Typography>
        </ListItem>
      </List>

      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Shipping
        </Typography>
        <Typography gutterBottom>{data1.name}</Typography>
        <Typography gutterBottom>
          {data1.address1}
          {data1.address2}
        </Typography>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Shipping
        </Typography>
        <Typography gutterBottom></Typography>
        <Typography gutterBottom></Typography>
      </Grid> */}

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
    </>
  );
};

export default ItemStep;
