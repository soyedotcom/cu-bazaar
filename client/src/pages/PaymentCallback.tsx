import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      setStatus("Invalid payment reference");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/orders/verify/${reference}`);
        const paymentStatus = res.data.data.status;

        if (paymentStatus === "success") {
          setStatus("Payment successful! Redirecting...");
          setTimeout(() => navigate("/profile"), 2000);
        } else {
          setStatus("Payment was not completed.");
        }
      } catch {
        setStatus("Failed to verify payment.");
      }
    };

    verify();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-xl font-bold">{status}</p>
    </main>
  );
};

export default PaymentCallback;
