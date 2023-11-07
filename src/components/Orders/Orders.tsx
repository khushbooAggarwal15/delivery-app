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
  TextField,
} from "@mui/material";
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

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const storedData = window.localStorage.getItem("data");
  const data: IData = storedData ? JSON.parse(storedData) : null;
  const data1: IAddress = storedData ? JSON.parse(storedData) : null;

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
      <TextField
        fullWidth
        label="Search"
        id="Search"
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Shipping Address</StyledTableCell>
              {/* <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">FulFillment</StyledTableCell>
              <StyledTableCell align="center">Start gps</StyledTableCell>
              <StyledTableCell align="center">
                Start address areacode
              </StyledTableCell>
              <StyledTableCell align="center">End gps</StyledTableCell>
              <StyledTableCell align="center">
                End address areacode
              </StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item: any, index: any) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <StyledTableCell align="center"> Name</StyledTableCell>
                <StyledTableCell align="center"> 200</StyledTableCell> */}

                <StyledTableCell align="center">{data1?.name}</StyledTableCell>
                {/* <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.fulfillment_type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {item?.message?.intent?.fulfillment?.start?.location?.gps}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    item.message?.intent?.fulfillment?.start?.location?.address
                      ?.area_code
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item?.message?.intent?.fulfillment?.end?.location?.gps}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    item.message?.intent?.fulfillment?.end?.location?.address
                      ?.area_code
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
