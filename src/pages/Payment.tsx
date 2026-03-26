import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import qrImage from "@/assets/qr.png";
import PageWrapper from "@/components/PageWrapper";
import Navbar from "@/components/Navbar";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subscriber = location.state?.subscriber;

  const plan = subscriber?.plan || "basic";
  const quantity = subscriber?.quantity || 1;
  const amount = subscriber?.amount || 499;

  // ✅ MOBILE DETECTION
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // ✅ UPI LINK
  const upiLink = `upi://pay?pa=yourupi@bank&pn=Hariom Shukla&am=${amount}&cu=INR`;

  const handleDone = () => {
    navigate("/pending");
  };

  return (
    <PageWrapper>
       <Navbar backTo="/subscribe" />
      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8 text-center">

          <h1 className="text-xl font-bold mb-4">
            Complete Your Payment
          </h1>

          {/* ✅ PLAN SUMMARY */}
          <div className="mb-6 p-4 border rounded-xl bg-secondary/50 text-sm">
            <p><strong>Plan:</strong> {plan}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p className="text-lg font-bold mt-2">Total: ₹{amount}</p>
          </div>

          {/* ✅ DYNAMIC INSTRUCTION */}
          <p className="text-muted-foreground mb-6 text-sm">
            {isMobile
              ? "Use the button below to pay instantly via UPI"
              : "Scan the QR code using your phone to complete payment"}
          </p>

          {/* QR */}
          <img
            src={qrImage}
            alt="UPI QR"
            className="w-56 h-56 mx-auto mb-4"
          />

          {/* SELLER */}
          <div className="mb-4">
            <p className="font-semibold">Hariom Shukla</p>
            <p className="text-xs text-green-600">✔ Verified Seller</p>
          </div>

          {/* ✅ SHOW ONLY ON MOBILE */}
          {isMobile && (
            <a href={upiLink}>
              <Button className="w-full h-12 rounded-xl mb-3">
                Pay via UPI App
              </Button>
            </a>
          )}

          {/* DONE BUTTON */}
          <Button
            onClick={handleDone}
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
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