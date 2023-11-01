import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";

interface FormSchema {
  message: {
    intent: {
      category: {
        id: string;
      };
      payment: {
        payment_type: string;
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
      payment: yup.object().shape({
        payment_type: yup.string().required("Payment Type is required"),
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
            gps: yup.string().required("End GPS is required"),
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

const OrderForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });
  const { formData, data } = useAuth();
  const route = useRouter();
  const onSubmit = (data: any) => {
    console.log("true");
    console.log(data);
    formData(data);
    route.push("/dashboardpage");
  };

  const handleNavigation = () => {
    route.push("/dashboardpage");
  };

  return (
    <div>
      <Button variant="text" onClick={handleNavigation}>
        &lt; Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>Category:</p>

          <Controller
            name="message.intent.category.id"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
          <p>{errors.message?.intent?.category?.id?.message}</p>
        </div>
        <div>
          <p>Payment:</p>
          <Controller
            name="message.intent.payment.payment_type"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
          <p>{errors?.message?.intent?.payment?.payment_type?.message}</p>
        </div>
        <div>
          <p>FulFillment Type:</p>
          <Controller
            name="message.intent.fulfillment.fulfillment_type"
            control={control}
            render={({ field }) => (
              <TextField
                label="Fulfillment Type"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {errors?.message?.intent?.fulfillment?.fulfillment_type?.message}
          </p>

          <Controller
            name="message.intent.fulfillment.start.location.gps"
            control={control}
            render={({ field }) => (
              <TextField
                label="Start GPS"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {errors.message?.intent?.fulfillment?.start?.location?.gps?.message}
          </p>
          <Controller
            name="message.intent.fulfillment.start.location.address.area_code"
            control={control}
            render={({ field }) => (
              <TextField
                label="Start Area Code"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {
              errors.message?.intent?.fulfillment?.start?.location?.address
                ?.area_code?.message
            }
          </p>
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
          <p>
            {errors?.message?.intent?.fulfillment?.end?.location?.gps?.message}
          </p>
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
          <p>
            {
              errors?.message?.intent?.fulfillment?.end?.location?.address
                ?.area_code?.message
            }
          </p>
        </div>

        <div>
          <p>Payload</p>
          <Controller
            name="message.intent.payload_details.weight.unit"
            control={control}
            render={({ field }) => (
              <TextField
                label="Weight Unit"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {errors?.message?.intent?.payload_details?.weight?.unit?.message}
          </p>
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
          <p>
            {errors?.message?.intent?.payload_details?.weight?.value?.message}
          </p>
          <Controller
            name="message.intent.payload_details.dimensions.length.unit"
            control={control}
            render={({ field }) => (
              <TextField
                label="Length Unit"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.length?.unit
                ?.message
            }
          </p>
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
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.length
                ?.value?.message
            }
          </p>
          <Controller
            name="message.intent.payload_details.dimensions.breadth.unit"
            control={control}
            render={({ field }) => (
              <TextField
                label="Breadth Unit"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.breadth
                ?.unit?.message
            }
          </p>
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
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.breadth
                ?.value?.message
            }
          </p>
          <Controller
            name="message.intent.payload_details.dimensions.height.unit"
            control={control}
            render={({ field }) => (
              <TextField
                label="Height Unit"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.height?.unit
                ?.message
            }
          </p>
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
          <p>
            {
              errors?.message?.intent?.payload_details?.dimensions?.height
                ?.value?.message
            }
          </p>
          <Controller
            name="message.intent.payload_details.category"
            control={control}
            render={({ field }) => (
              <TextField
                label="Category"
                fullWidth
                variant="outlined"
                {...field}
              />
            )}
          />
          <p>{errors?.message?.intent?.payload_details?.category?.message}</p>

          <Controller
            name="message.intent.payload_details.dangerous_goods"
            control={control}
            render={({ field }) => (
              <TextField
                label="Dangerous Goods"
                fullWidth
                variant="outlined"
                type="number"
                {...field}
              />
            )}
          />
          <p>
            {errors?.message?.intent?.payload_details?.dangerous_goods?.message}
          </p>
        </div>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
