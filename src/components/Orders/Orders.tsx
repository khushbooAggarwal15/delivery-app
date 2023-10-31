import { useAuth } from "@/utils/auth";
import React from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  const { data } = useAuth();
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No orders available.</p>;
  }
  console.log("data", data);
  return (
    <>
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
          {data.map((item) => (
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
