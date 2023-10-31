import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import styles from "./OrderForm.module.css";
import { useAuth } from "@/utils/auth";
import { Box, Button, TextField } from "@mui/material";

interface FormData {
  location: {
    startingPoint: string;
    endingPoint: string;
    latitude: number;
    longitude: number;
    pincode: string;
  };
  payloadDetails: {
    weight: number;
    itemType: string;
    length: number;
    breadth: number;
    height: number;
    name: string;
    contact: string;
  };
}

const schema = yup.object().shape({
  location: yup.object().shape({
    startingPoint: yup.string().required("Starting point is required"),
    endingPoint: yup.string().required("Ending point is required"),
    latitude: yup
      .number()
      .required("Latitude is required")
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    longitude: yup
      .number()
      .required("Longitude is required")
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
    pincode: yup.string().required("Pincode is required"),
  }),
  payloadDetails: yup.object().shape({
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .required("Weight is required")
      .positive("Weight must be positive"),
    itemType: yup.string().required("Item type is required"),
    length: yup
      .number()
      .required("Length is required")
      .positive("Length must be positive"),
    breadth: yup
      .number()
      .required("Breadth is required")
      .positive("Breadth must be positive"),
    height: yup
      .number()
      .required("Height is required")
      .positive("Height must be positive"),
    name: yup.string().required("Name is required"),
    contact: yup.string().required("Contact information is required"),
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
  const handleNavigation = () => {
    route.push("/dashboardpage");
  };

  return (
    <div className={styles.orderformcontainer}>
      <Button variant="text" onClick={() => handleNavigation()}>
        &lt; Back
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Pickup/Drop-off Locations</h2>
          <div className={styles.formgroup}>
            <label className={styles.label}>Starting Point:</label>
            <Box>
              <Controller
                name="location.startingPoint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                  />
                )}
              />
            </Box>
            <p className={styles.errormessage}>
              {errors.location?.startingPoint?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Ending Point:</label>
            <Box>
              {" "}
              <Controller
                name="location.endingPoint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                  />
                )}
              />
            </Box>
            <p className={styles.errormessage}>
              {errors.location?.endingPoint?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Latitude:</label>
            <Box>
              {" "}
              <Controller
                name="location.latitude"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>
            <p className={styles.errormessage}>
              {errors.location?.latitude?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Longitude:</label>
            <Box>
              {" "}
              <Controller
                name="location.longitude"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.location?.longitude?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Pincode:</label>
            <Box>
              {" "}
              <Controller
                name="location.pincode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.location?.pincode?.message}
            </p>
          </div>
        </div>
        <div>
          <h2>Payload Details</h2>
          <div className={styles.formgroup}>
            <label className={styles.label}>Item Weight:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.weight"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.weight?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Item Type:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.itemType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.itemType?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Length:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.length"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.length?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Breadth:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.breadth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.breadth?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Height:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.height"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.height?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Name of User:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.name?.message}
            </p>
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Contact Information:</label>
            <Box>
              {" "}
              <Controller
                name="payloadDetails.contact"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-control"
                    variant="outlined"
                  />
                )}
              />
            </Box>{" "}
            <p className={styles.errormessage}>
              {errors.payloadDetails?.contact?.message}
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
