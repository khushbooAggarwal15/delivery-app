import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
interface Order {
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

        dangerous_goods: string;
      };
    };
  };
}

const DetailsForm: React.FC<{
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpenDetails }) => {
  const [data, setData] = useState({} as Order);
  const storedData = window.localStorage.getItem("data");

  useEffect(() => {
    if (storedData) {
      const dataArray = JSON.parse(storedData);
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        const lastItem = dataArray[dataArray.length - 1];
        setData(lastItem);
      }
    }
  }, []);
  const handleConfirm = () => {
    setOpenDetails(false);
  };
  console.log(data);
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
                <p>Name</p>
              </TableCell>
              <TableCell align="center">
                <p>20</p>
              </TableCell>
              <TableCell align="center">
                {data.message?.intent?.category?.id}
              </TableCell>

              <TableCell align="center">
                {" "}
                {data.message?.intent?.fulfillment?.start?.location?.gps}
              </TableCell>
              <TableCell align="center">
                {" "}
                {
                  data.message?.intent?.fulfillment?.start?.location?.address
                    ?.area_code
                }
              </TableCell>
              <TableCell align="center">
                {" "}
                {data.message?.intent?.fulfillment?.end?.location?.gps}
              </TableCell>
              <TableCell align="center">
                {" "}
                {
                  data.message?.intent?.fulfillment?.end?.location?.address
                    ?.area_code
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleConfirm}>
        Confirm Order
      </Button>
    </>
  );
};

export default DetailsForm;
