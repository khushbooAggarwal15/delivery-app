import React from "react";
declare global {
  interface Window {
    Razorpay: any;
  }
}
const BillingStep = () => {
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
        alert("Razorpay Response: " + response.razorpay_payment_id);
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
      <button onClick={() => makePayment()}>Pay 100 now</button>
    </div>
  );
};

export default BillingStep;
