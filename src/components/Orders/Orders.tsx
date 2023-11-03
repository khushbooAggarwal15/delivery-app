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

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredData = data.filter((item) => {
    if (item?.message?.intent && typeof item.message.intent === "object") {
      const allValues = Object.values(item.message.intent).flatMap((obj) => {
        if (typeof obj === "object") {
          return Object.values(obj);
        }
        return [obj];
      });
      return allValues.some((field) =>
        String(field).toLowerCase().includes(lowerSearchTerm)
      );
    } else {
      return false;
    }
  });
  return (
    <>
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Start gps</StyledTableCell>
              <StyledTableCell align="center">
                Start address areacode
              </StyledTableCell>
              <StyledTableCell align="center">End gps</StyledTableCell>
              <StyledTableCell align="center">
                End address areacode
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item: any, index: any) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {index}
                </TableCell> */}
                <StyledTableCell align="center">
                  {" "}
                  {/* {item?.message?.intent?.name} */}Name
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {/* {item?.message?.intent?.cost} */}200
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {item?.message?.intent?.fulfillment?.fulfillment_type}
                </StyledTableCell> */}
                <StyledTableCell align="center">
                  {item?.message?.intent?.category?.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.start?.location?.gps}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item.message?.intent?.fulfillment?.start?.location?.address
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
                    item.message?.intent?.fulfillment?.end?.location?.address
                      ?.area_code
                  }
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.payload_details?.weight?.value}{" "}
                  {item?.message?.intent?.payload_details?.weight?.unit}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item.message?.intent?.payload_details?.dimensions?.length
                      ?.value
                  }{" "}
                  {
                    item.message?.intent?.payload_details?.dimensions?.length
                      ?.unit
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {
                    item.message?.intent?.payload_details?.dimensions?.breadth
                      ?.value
                  }{" "}
                  {
                    item.message?.intent?.payload_details?.dimensions?.breadth
                      ?.unit
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    item.message?.intent?.payload_details?.dimensions?.height
                      ?.value
                  }{" "}
                  {
                    item.message?.intent?.payload_details?.dimensions?.height
                      ?.unit
                  }
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
