import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  AppBar,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ItemStep from "@/components/ItemStep/ItemStep";
import AddressStep from "@/components/AddressStep/AddressStep";
import BillingStep from "@/components/BillingStep/BillingStep";

const steps = ["Address", "Payment", "Items"];

const drawerWidth = 0;

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setactiveStep] = useState<number>(0);

  const handleBack = () => {
    setactiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setactiveStep(activeStep + 1);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sky-blue Dart
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 ? (
            <AddressStep
              setactiveStep={setactiveStep}
              activeStep={activeStep}
            />
          ) : activeStep === 1 ? (
            <BillingStep
              setactiveStep={setactiveStep}
              activeStep={activeStep}
            />
          ) : activeStep === 2 ? (
            <ItemStep />
          ) : (
            ""
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}
