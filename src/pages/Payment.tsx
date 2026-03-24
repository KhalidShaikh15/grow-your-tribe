import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import qrImage from "@/assets/qr.png"; // 👉 put your QR image here
import PageWrapper from "@/components/PageWrapper";


const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subscriber = location.state?.subscriber;

  const handleDone = () => {
    navigate("/pending");
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8 text-center">

        <h1 className="text-xl font-bold mb-2">
          Complete Your Payment
        </h1>

        <p className="text-muted-foreground mb-6 text-sm">
          Scan the QR code below using any UPI app
        </p>

        {/* QR IMAGE */}
        <img
          src={qrImage}
          alt="UPI QR"
          className="w-56 h-56 mx-auto mb-4"
        />

        {/* Seller Info */}
        <div className="mb-4">
          <p className="font-semibold">Hariom Shukla</p>
          <p className="text-xs text-green-600">✔ Verified Seller</p>
        </div>

        {/* Amount */}
        <p className="text-lg font-bold mb-6">
          Amount: ₹{subscriber?.amount || 499}
        </p>

        {/* Button */}
        <Button onClick={handleDone} className="w-full h-11 rounded-xl">
          I Have Paid
        </Button>

        <p className="text-xs text-muted-foreground mt-3">
          After payment, click above to continue
        </p>

      </div>
      </div>
    </PageWrapper>
  );
};

export default Payment;