import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

import { CircularProgress, Backdrop } from "@mui/material";
import Router, { useRouter } from "next/router";
interface Order {
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

const DetailsForm: React.FC<{
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  formDetails: any;
}> = ({ setOpenDetails, formDetails }) => {
  const { newformData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    // console.log(loading);
    // setLoading(true);

    newformData(formDetails);
    console.log("formDetails", formDetails);

    // setTimeout(() => {
    // setOpenDetails(false);
    // }, 2000);

    router.push("/checkoutpage");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">Id</TableCell>

              <TableCell align="center">Start gps</TableCell>
              <TableCell align="center">Start address areacode</TableCell>
              <TableCell align="center">End gps</TableCell>
              <TableCell align="center">End address areacode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <p> Name</p>
              </TableCell>
              <TableCell align="center">
                <p>200</p>
              </TableCell>
              <TableCell align="center">
                {formDetails.message?.intent?.category?.id}
              </TableCell>

              <TableCell align="center">
                {" "}
                {formDetails.message?.intent?.fulfillment?.start?.location?.gps}
              </TableCell>
              <TableCell align="center">
                {" "}
                {
                  formDetails.message?.intent?.fulfillment?.start?.location
                    ?.address?.area_code
                }
              </TableCell>
              <TableCell align="center">
                {" "}
                {formDetails.message?.intent?.fulfillment?.end?.location?.gps}
              </TableCell>
              <TableCell align="center">
                {" "}
                {
                  formDetails.message?.intent?.fulfillment?.end?.location
                    ?.address?.area_code
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center">
        <Button variant="contained" onClick={handleConfirm}>
          Add to Cart
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

export default DetailsForm;
