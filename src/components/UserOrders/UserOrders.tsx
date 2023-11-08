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
  const userEmail: any = window.localStorage.getItem("email");
  const data: IData[] = storedData ? JSON.parse(storedData) : null;

  if (data === null || data.length === 0) {
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

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const filteredData = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
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
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Item</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">fulfillment Type</StyledTableCell>
              <StyledTableCell align="center">Shipping Address</StyledTableCell>
              <StyledTableCell align="center">Transaction Id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item: IData, index: any) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{item?.email}</StyledTableCell>

                <StyledTableCell align="center">
                  {item?.data?.message?.intent?.category?.id}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {item?.data?.message?.intent?.fulfillment?.fulfillment_type}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {item?.data1?.address1}
                  <br />
                  {item?.data1?.address2},{item?.data1?.landmark}
                  <br />
                  {item?.data1?.city},{item?.data1?.state},{item?.data1?.zip}
                  <br />
                  {item?.data1?.country}
                </StyledTableCell>

                <StyledTableCell align="center">{item?.data2}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
