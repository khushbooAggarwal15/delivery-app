import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";
import styles from "./OrderForm.module.css";
import axios from "axios";
interface FormSchema {
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
        dangerous_goods: boolean;
      };
    };
  };
}

const schema = yup.object().shape({
  message: yup.object().shape({
    intent: yup.object().shape({
      category: yup.object().shape({
        id: yup.string().required("Category ID is required"),
      }),

      fulfillment: yup.object().shape({
        fulfillment_type: yup.string().required("Fulfillment Type is required"),
        start: yup.object().shape({
          location: yup.object().shape({
            gps: yup.string().required("Start GPS is required"),

            address: yup.object().shape({
              area_code: yup.string().required("Start Area Code is required"),
            }),
          }),
        }),
        end: yup.object().shape({
          location: yup.object().shape({
            gps: yup
              .string()

              .required("End GPS is required"),

            address: yup.object().shape({
              area_code: yup.string().required("End Area Code is required"),
            }),
          }),
        }),
      }),

      payload_details: yup.object().shape({
        weight: yup.object().shape({
          unit: yup.string().required("Weight Unit is required"),
          value: yup.number().required("Weight Value is required"),
        }),
        dimensions: yup.object().shape({
          length: yup.object().shape({
            unit: yup.string().required("Length Unit is required"),
            value: yup.number().required("Length Value is required"),
          }),
          breadth: yup.object().shape({
            unit: yup.string().required("Breadth Unit is required"),
            value: yup.number().required("Breadth Value is required"),
          }),
          height: yup.object().shape({
            unit: yup.string().required("Height Unit is required"),
            value: yup.number().required("Height Value is required"),
          }),
        }),
        category: yup.string().required("Category is required"),
        dangerous_goods: yup.boolean().required("Dangerous Goods is required"),
      }),
    }),
  }),
});

const OrderForm: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen, setOpenDetails }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const { formData, data } = useAuth();
  const handleGPS = (data: string) => {
    if (data) {
      setLoading(true);

      const [lat, lng] = data.split(",").map((str) => str.trim());

      setLatitude(lat);
      setLongitude(lng);
      console.log("lat", lat);
      console.log("lng", lng);
      fetchAreaCode(lat, lng);
    }
  };

  const fetchAreaCode = async (lat: string, lng: string) => {
    try {
      const response = await axios.post(
        "https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/nearby",
        {
          lat: lat,
          lng: lng,
        },
        {
          headers: {
            "X-RapidAPI-Key":
              "0090c6b04cmsh7bbe450a283970cp1a566bjsn9c74cbc920bd",
            "X-RapidAPI-Host":
              "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);

      setValue(response.data.areas[0]["pincode"]);
      console.log("value", value);
    } catch (error) {
      console.error("Error sending latitude and longitude to the API:", error);
    }
  };

  const route = useRouter();

  const onSubmit = async (data: any) => {
    console.log("Submitting data:", data);

    formData(data);
    setOpen(false);
    setOpenDetails(true);

    // route.push("/dashboardpage");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3>Category:</h3>

          <Controller
            name="message.intent.category.id"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth defaultValue="">
                <MenuItem value="Immediate delivery">
                  Immediate delivery
                </MenuItem>
                <MenuItem value="Standard delivery">Standard delivery</MenuItem>
                <MenuItem value="Same Day delivery">Same Day delivery</MenuItem>
                <MenuItem value="Express delivery">Express delivery</MenuItem>
              </Select>
            )}
          />
          <p style={{ color: "red" }}>
            {errors.message?.intent?.category?.id?.message}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3>FulFillment:</h3>

          <Controller
            name="message.intent.fulfillment.fulfillment_type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="Return"
                  control={<Radio />}
                  label="Return"
                />
                <FormControlLabel
                  value="Exchange"
                  control={<Radio />}
                  label="Exchange"
                />
              </RadioGroup>
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.message?.intent?.fulfillment?.fulfillment_type?.message}
          </p>
          {/* </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        > */}
          <h3>Starting Location:</h3>

          <Controller
            name="message.intent.fulfillment.start.location.gps"
            control={control}
            render={({ field }) => (
              <TextField
                label="Start GPS"
                fullWidth
                variant="outlined"
                {...field}
                // onChange={(e) => handleGPS(e.target.value)}
              />
            )}
          />

          <Controller
            name="message.intent.fulfillment.start.location.address.area_code"
            control={control}
            render={({ field }) => (
              <TextField
                label="Start Area Code"
                fullWidth
                variant="outlined"
                {...field}
                // value={value}
              />
            )}
          />

          <h3>Ending Location:</h3>

          <Controller
            name="message.intent.fulfillment.end.location.gps"
            control={control}
            render={({ field }) => (
              <TextField
                label="End GPS"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="message.intent.fulfillment.end.location.address.area_code"
            control={control}
            render={({ field }) => (
              <TextField
                label="End Area Code"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
            justifyContent: "space-between",
            color: "red",
          }}
        >
          <p>
            {errors.message?.intent?.fulfillment?.start?.location?.gps?.message}
          </p>
          <p>
            {
              errors.message?.intent?.fulfillment?.start?.location?.address
                ?.area_code?.message
            }
          </p>
          <p>
            {errors?.message?.intent?.fulfillment?.end?.location?.gps?.message}
          </p>
          <p>
            {
              errors?.message?.intent?.fulfillment?.end?.location?.address
                ?.area_code?.message
            }
          </p>
        </div>
        <div>
          <h3>Payload:</h3>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <label>Weight Value</label>
            <Controller
              name="message.intent.payload_details.weight.value"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Weight Value"
                  fullWidth
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <label>Weight Unit</label>
            <Controller
              name="message.intent.payload_details.weight.unit"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth defaultValue="">
                  <MenuItem value="kilogram">kilogram</MenuItem>
                </Select>
              )}
            />

            <label>Length Value</label>
            <Controller
              name="message.intent.payload_details.dimensions.length.value"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Length Value"
                  fullWidth
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <label>Length Unit</label>
            <Controller
              name="message.intent.payload_details.dimensions.length.unit"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth defaultValue="">
                  <MenuItem value="centimeter">centimeter</MenuItem>
                  <MenuItem value="meter">meter</MenuItem>
                </Select>
              )}
            />

            <label>Breadth Value</label>
            <Controller
              name="message.intent.payload_details.dimensions.breadth.value"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Breadth Value"
                  fullWidth
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <label>Breadth Unit</label>
            <Controller
              name="message.intent.payload_details.dimensions.breadth.unit"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth defaultValue="">
                  <MenuItem value="centimeter">centimeter</MenuItem>
                  <MenuItem value="meter">meter</MenuItem>
                </Select>
              )}
            />

            <label>Height Value</label>
            <Controller
              name="message.intent.payload_details.dimensions.height.value"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Height Value"
                  fullWidth
                  variant="outlined"
                  type="number"
                  {...field}
                />
              )}
            />

            <label>Height Unit</label>
            <Controller
              name="message.intent.payload_details.dimensions.height.unit"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth defaultValue="">
                  <MenuItem value="centimeter">centimeter</MenuItem>
                  <MenuItem value="meter">meter</MenuItem>
                </Select>
              )}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              marginBottom: "30px",
              justifyContent: "space-between",
              color: "red",
            }}
          >
            <p>
              {errors?.message?.intent?.payload_details?.weight?.value?.message}
            </p>
            <p>
              {errors?.message?.intent?.payload_details?.weight?.unit?.message}
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.length
                  ?.value?.message
              }
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.length
                  ?.unit?.message
              }
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.breadth
                  ?.value?.message
              }
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.breadth
                  ?.unit?.message
              }
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.height
                  ?.value?.message
              }
            </p>
            <p>
              {
                errors?.message?.intent?.payload_details?.dimensions?.height
                  ?.unit?.message
              }
            </p>
          </div>
          <h3>Category</h3>
          <Controller
            name="message.intent.payload_details.category"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="Grocery"
                  control={<Radio />}
                  label=" Grocery"
                />
                <FormControlLabel
                  value="Cosmetics"
                  control={<Radio />}
                  label="Cosmetics"
                />
              </RadioGroup>
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.message?.intent?.payload_details?.category?.message}
          </p>
          <h3>Dangerous Goods</h3>
          <Controller
            name="message.intent.payload_details.dangerous_goods"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label=" True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            )}
          />
          <p style={{ color: "red" }}>
            {errors?.message?.intent?.payload_details?.dangerous_goods?.message}
          </p>
        </div>

        <div style={{ width: "100%" }}>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
