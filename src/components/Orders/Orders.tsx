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
  styled,
  tableCellClasses,
} from "@mui/material";
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // const lowerSearchTerm = searchTerm.toLowerCase();
  // console.log(lowerSearchTerm);
  // const filteredData = data.filter((item) => {
  //   const itemValues = Object.values(item).map((value) =>
  //     typeof value === "object" ? JSON.stringify(value) : value
  //   );
  //   console.log("itemValues", itemValues);
  //   return itemValues.some((value) =>
  //     value.toLowerCase().includes(lowerSearchTerm)
  //   );
  // });
  // const lowerSearchTerm = searchTerm.toLowerCase();

  // const filteredData = data.filter((item) => {
  //   const allValues = Object.values(item.message.intent).flatMap((obj) => {
  //     if (typeof obj === "object") {
  //       return Object.values(obj);
  //     }
  //     return [obj];
  //   });
  //   return allValues.some((field) =>
  //     String(field).toLowerCase().includes(lowerSearchTerm)
  //   );
  // });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Fulfillment_type</StyledTableCell>
              <StyledTableCell align="center">Start gps</StyledTableCell>
              <StyledTableCell align="center">
                Start address areacode
              </StyledTableCell>
              <StyledTableCell align="center">End gps</StyledTableCell>
              <StyledTableCell align="center">
                End address areacode
              </StyledTableCell>
              <StyledTableCell align="center">Weight</StyledTableCell>
              <StyledTableCell align="center">Length</StyledTableCell>
              <StyledTableCell align="center">Beadth</StyledTableCell>
              <StyledTableCell align="center">Height</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any, index: any) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {index}
                </TableCell> */}
                <StyledTableCell align="center">
                  {item?.message?.intent?.category?.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item?.message?.intent?.fulfillment?.fulfillment_type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.start?.location?.gps}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.fulfillment?.start?.location?.address
                      ?.area_code
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.end?.location?.gps}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.fulfillment?.end?.location?.address
                      ?.area_code
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.payload_details?.weight?.value}{" "}
                  {item?.message?.intent?.payload_details?.weight?.unit}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.length
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.length
                      ?.unit
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.breadth
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.breadth
                      ?.unit
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    item?.message?.intent?.payload_details?.dimensions?.height
                      ?.value
                  }{" "}
                  {
                    item?.message?.intent?.payload_details?.dimensions?.height
                      ?.unit
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
