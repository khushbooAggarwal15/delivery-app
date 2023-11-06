import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import ItemStep from "@/components/ItemStep/ItemStep";
import AddressStep from "@/components/AddressStep/AddressStep";
import BillingStep from "@/components/BillingStep/BillingStep";

const steps = ["Items", "Address", "Payment"];

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
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === 0 ? (
        <ItemStep />
      ) : activeStep === 1 ? (
        <AddressStep />
      ) : activeStep === 2 ? (
        <BillingStep />
      ) : (
        ""
      )}
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  );
}
