import { useAuth } from "@/utils/auth";
import { Button } from "@mui/material";
import React from "react";
declare global {
  interface Window {
    Razorpay: any;
  }
}
const BillingStep = ({ setactiveStep, activeStep }: any) => {
  const { transactionData } = useAuth();
  // const [transaction, setTransaction] = useState(false);
  // const handleClick = () => {
  //   if (transaction) {
  //     setactiveStep(activeStep + 1);
  //   }
  // };
  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taxAmt: 100,
      }),
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Delivery App",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          const transactionId = response.razorpay_payment_id;
          transactionData(transactionId);
          alert("Payment successful. Transaction ID: " + transactionId);
          setactiveStep(activeStep + 1);
        } else {
          alert("Payment failed or canceled.");
        }
      },
      prefill: {
        name: "khushboo aggarwal",
        email: "aggarwal.khushi1501@gmail.com",
        contact: "9588721893",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => makePayment()}
        sx={{ mt: 3, ml: 1 }}
        fullWidth
      >
        Pay Now
      </Button>
      {/* <Button
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ mt: 3, ml: 1, textAlign: "end" }}
      >
        Next
      </Button> */}
    </div>
  );
};

export default BillingStep;
