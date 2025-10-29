"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useToast } from "@/hooks/use-toast";
const PaypalButton = ({
  productId,
  amount,
  currency,
  description,
}: {
  productId: string;
  amount: string;
  currency: string;
  description: string;
}) => {
  const { toast } = useToast();
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "blue" }}
        createOrder={async (data, actions) => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount,
              currency,
              description,
            }),
          });
          const order = await res.json();
          return order.id;
        }}
        onApprove={async (data, actions) => {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: data.orderID,
              productId,
            }),
          });
          const details = await res.json();
          toast({
            title: "Payment successful",
            description: "Thank you for your purchase!",
          });
          // Refresh the page to update user's premium status
          window.location.reload();
        }}
        onError={(err) => {
          console.error(err);
          toast({
            title: "Payment failed",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }}
      />
    </PayPalScriptProvider>
  );
};
export default PaypalButton;