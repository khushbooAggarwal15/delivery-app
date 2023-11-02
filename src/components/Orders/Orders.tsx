import { useAuth } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Orders.module.css";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
interface Order {
  message: {
    intent: {
      category: {
        id: string;
      };
      payment: {
        payment_type: string;
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

const Orders = () => {
  const route = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const storedData = window.localStorage.getItem("data");
  const data: Order[] | null = storedData ? JSON.parse(storedData) : null;

  if (data === null || data.length === 0) {
    return <p>No orders available.</p>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No orders available.</p>;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  console.log(lowerSearchTerm);
  // const filteredData = data.filter((item) => {
  //   const itemValues = Object.values(item).map((value) =>
  //     typeof value === "object" ? JSON.stringify(value) : value
  //   );
  //   console.log("itemValues", itemValues);
  //   return itemValues.some((value) =>
  //     value.toLowerCase().includes(lowerSearchTerm)
  //   );
  // });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Payment_type</TableCell>
              <TableCell align="center">Fulfillment_type</TableCell>
              <TableCell align="center">Start gps</TableCell>
              <TableCell align="center">Start address areacode</TableCell>
              <TableCell align="center">End gps</TableCell>
              <TableCell align="center">End address areacode</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Length</TableCell>
              <TableCell align="center">Beadth</TableCell>
              <TableCell align="center">Height</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {index}
                </TableCell> */}
                <TableCell align="center">
                  {item?.message?.intent?.category?.id}
                </TableCell>
                <TableCell align="center">
                  {item?.message?.intent?.payment?.payment_type}
                </TableCell>
                <TableCell align="center">
                  {item?.message?.intent?.fulfillment?.fulfillment_type}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.start?.location?.gps}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.fulfillment?.start?.location?.address
                      ?.area_code
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.end?.location?.gps}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.fulfillment?.end?.location?.address
                      ?.area_code
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {item?.message?.intent?.payload_details?.weight?.value}{" "}
                  {item?.message?.intent?.payload_details?.weight?.unit}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.length
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.length
                      ?.unit
                  }
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.breadth
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.breadth
                      ?.unit
                  }
                </TableCell>
                <TableCell align="center">
                  {
                    item?.message?.intent?.payload_details?.dimensions?.height
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.height
                      ?.unit
                  }
                </TableCell>
                <TableCell align="center">
                  <a href={`/createorder/ ${index}`}> Edit </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
