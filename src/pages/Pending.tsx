import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Pending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      
      {/* ✅ Premium Card Container */}
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8 text-center">

        {/* Icon */}
        <div className="text-5xl mb-4">⏳</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Payment Verification Pending
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Your submission has been received.  
          <br />
          Our team will verify your payment shortly.
        </p>

        {/* Divider */}
        <div className="h-px bg-border my-6" />

        {/* Button */}
        <Button className="w-full h-11 rounded-xl" asChild>
          <Link to="/">Back to Home</Link>
        </Button>

      </div>
    </div>
  );
};

export default Pending;