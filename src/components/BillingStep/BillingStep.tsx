import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
  Button,
} from "@mui/material";

export default function PaymentForm({ setactiveStep, activeStep }: any) {
  const handleClick = () => {
    setactiveStep(activeStep + 1);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Select Payment method
      </Typography>

      <FormControl>
        <RadioGroup>
          <Grid container spacing={12}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="Credit or debit card"
                control={<Radio />}
                label="Credit or debit card"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="Net Banking"
                control={<Radio />}
                label="Net Banking"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="Other UPI Apps"
                control={<Radio />}
                label="Other UPI Apps"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                value="Cash on Delivery/Pay on Delivery"
                control={<Radio />}
                label="Cash on Delivery/Pay on Delivery"
              />
            </Grid>
          </Grid>
        </RadioGroup>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
            marginLeft: 6,
          }}
        >
          <Button
            type="submit"
            onClick={handleClick}
            variant="contained"
            sx={{ mt: 3, ml: 1, justifyContent: "flex-end" }}
          >
            Next
          </Button>
        </Box>
      </FormControl>
    </>
  );
}
