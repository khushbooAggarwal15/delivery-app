import { useAuth } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  // const { data } = useAuth();

  interface Order {
    message: {
      intent: {
        category: {
          id: string;
        };
        fulfillment: {
          type: string;
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
        payment: {
          type: string;
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
      <div>
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
            <th>Starting Point </th>
            <th>Ending Point</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Pincode</th>
            <th>Item Weight</th>
            <th>Item Type</th>
            <th>Length</th>
            <th>Breadth</th>
            <th>Height</th>
            <th>Name of User</th>
            <th>Contact Information</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((item) => (
            <tr className={styles.row}>
              <td> {item?.location?.startingPoint}</td>
              <td> {item?.location?.endingPoint}</td>
              <td> {item?.location?.latitude}</td>
              <td> {item?.location?.longitude}</td>
              <td> {item?.location?.pincode}</td>
              <td> {item?.payloadDetails?.weight}</td>
              <td> {item?.payloadDetails?.itemType}</td>
              <td> {item?.payloadDetails?.length}</td>
              <td> {item?.payloadDetails?.breadth}</td>
              <td> {item?.payloadDetails?.height}</td>
              <td> {item?.payloadDetails?.name}</td>
              <td> {item?.payloadDetails?.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
