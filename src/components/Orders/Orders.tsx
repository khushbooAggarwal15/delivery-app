import { useAuth } from "@/utils/auth";
import React, { useState } from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  // const { data } = useAuth();

  const storedData = window.localStorage.getItem("data");
  const data = storedData ? JSON.parse(storedData) : null;

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No orders available.</p>;
  }

  // const [searchTerm, setSearchTerm] = useState("");
  // const filteredData = data.filter((item) => {
  //   const lowerSearchTerm = searchTerm.toLowerCase();
  //   return Object.values(item).some((value) => {
  //     if (typeof value === "string") {
  //       return value.toLowerCase().includes(lowerSearchTerm);
  //     }
  //     return false;
  //   });
  // });

  return (
    <>
      <div>
        {/* <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
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
