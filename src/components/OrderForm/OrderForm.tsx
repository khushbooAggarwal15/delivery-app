import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import styles from "./OrderForm.module.css";
import { useAuth } from "@/utils/auth";

interface FormData {
  location: {
    startingPoint: string;
    endingPoint: string;
  };
  payloadDetails: {
    weight: number;
    itemType: string;
  };
}

const schema = yup.object().shape({
  location: yup.object().shape({
    startingPoint: yup.string().required("Starting point is required"),
    endingPoint: yup.string().required("Ending point is required"),
  }),
  payloadDetails: yup.object().shape({
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .required("Weight is required")
      .positive("Weight must be positive"),
    itemType: yup.string().required("Item type is required"),
  }),
});

function OrderForm() {
  const route = useRouter();
  const { formData, data } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    formData(data);
    console.log("data_orderForm", data);

    route.push("/dashboardpage");
  };

  return (
    <div className={styles.orderformcontainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Pickup/Drop-off Locations</h2>
          <div className={styles.formgroup}>
            <label>Starting Point:</label>
            <Controller
              name="location.startingPoint"
              control={control}
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
            <p className={styles.errormessage}>
              {errors.location?.startingPoint?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label>Ending Point:</label>
            <Controller
              name="location.endingPoint"
              control={control}
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
            <p className={styles.errormessage}>
              {errors.location?.endingPoint?.message}
            </p>
          </div>
        </div>
        <div>
          <h2>Payload Details</h2>
          <div className={styles.formgroup}>
            <label>Item Weight:</label>
            <Controller
              name="payloadDetails.weight"
              control={control}
              render={({ field }) => (
                <input {...field} className="form-control" type="number" />
              )}
            />
            <p className={styles.errormessage}>
              {errors.payloadDetails?.weight?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label>Item Type:</label>
            <Controller
              name="payloadDetails.itemType"
              control={control}
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
            <p className={styles.errormessage}>
              {errors.payloadDetails?.itemType?.message}
            </p>
          </div>
        </div>
        <div className={styles.formactions}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnprimary}`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
