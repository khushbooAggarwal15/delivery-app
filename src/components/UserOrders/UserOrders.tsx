import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  TextField,
  Box,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";

interface IData {
  data: {
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
  };
  data1: {
    name: string;
    contactnumber: string;
    address1: string;
    address2: string;
    landmark: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  email: string;
  data2: string;
}

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const storedData = window.localStorage.getItem("data");
  const data: IData[] = storedData ? JSON.parse(storedData) : null;

  if (data === null || data.length === 0) {
    return <p>No orders available.</p>;
  }

  const groupedData = data.reduce((acc: any, item) => {
    const email = item.email;
    if (!acc[email]) {
      acc[email] = [];
    }
    acc[email].push(item);
    return acc;
  }, {});

  // Convert grouped data to an array
  const groupedOrders = Object.entries(groupedData).map(
    ([email, orders]: any) => ({
      email,
      orders,
    })
  );

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

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [open, setOpen] = React.useState(false);
  return (
    <>
      {groupedOrders.map((group, groupIndex) => (
        <>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <StyledTableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </StyledTableCell>
            <TableCell>
              <h2 style={{ textAlign: "left" }} key={groupIndex}>
                {" "}
                {group.email}
              </h2>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0, width: "10%" }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                {group.orders.map((item: IData, index: any) => (
                  <Box sx={{ margin: 3 }} key={index}>
                    <Typography variant="h6" gutterBottom component="div">
                      Order Details
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Item</StyledTableCell>
                          <StyledTableCell align="center">
                            Fulfillment Type
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Shipping Address
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Transaction Id
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell align="center">
                            {
                              item?.data?.message?.intent?.payload_details
                                ?.category
                            }
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {
                              item?.data?.message?.intent?.fulfillment
                                ?.fulfillment_type
                            }
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {item?.data1?.address1}
                            <br />
                            {item?.data1?.address2},{item?.data1?.landmark}
                            <br />
                            {item?.data1?.city},{item?.data1?.state},
                            {item?.data1?.zip}
                            <br />
                            {item?.data1?.country}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {item?.data2}
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </Box>
                ))}
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  );
};

export default Orders;
