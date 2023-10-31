import { useAuth } from "@/utils/auth";
import React, { useState } from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  const { data } = useAuth();
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No orders available.</p>;
  }
  console.log("data", data);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((item) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      return false; // Skip non-string values
    });
  });

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
            <th>Starting Point: </th>
            <th>Ending Point</th>
            <th>Item Weight</th>
            <th>Item Type</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {filteredData.map((item) => (
            <tr className={styles.row}>
              <td> {item?.location?.startingPoint}</td>
              <td> {item?.location?.endingPoint}</td>
              <td> {item?.payloadDetails?.weight}</td>
              <td> {item?.payloadDetails?.itemType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
