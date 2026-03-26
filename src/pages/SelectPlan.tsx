import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";
import Navbar from "@/components/Navbar";

const SelectPlan = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialPlan = searchParams.get("plan") || "basic";

  const [plan, setPlan] = useState(initialPlan);
  const [quantity, setQuantity] = useState(1);

  const price = plan === "premium" ? 999 : 499;
  const total = price * quantity;

  const handleContinue = () => {
    navigate("/subscribe", {
      state: {
        plan,
        quantity,
        amount: total,
      },
    });
  };

  return (
    <PageWrapper>
      <Navbar backTo="/" />
      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8 text-center">

          <h1 className="text-xl font-bold mb-6">
            Select Your Plan
          </h1>

          {/* PLAN SELECT */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPlan("basic")}
              className={`flex-1 p-3 rounded-xl border ${
                plan === "basic" ? "border-primary bg-primary/10" : ""
              }`}
            >
              Basic ₹499
            </button>

            <button
              onClick={() => setPlan("premium")}
              className={`flex-1 p-3 rounded-xl border ${
                plan === "premium" ? "border-primary bg-primary/10" : ""
              }`}
            >
              Premium ₹999
            </button>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center justify-center gap-4 mb-6">

            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border text-lg"
            >
              -
            </button>

            <span className="text-xl font-bold">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border text-lg"
            >
              +
            </button>

          </div>

          {/* TOTAL */}
          <p className="text-lg font-bold mb-6">
            Total: ₹{total}
          </p>

          {/* CONTINUE */}
          <Button onClick={handleContinue} className="w-full h-12 rounded-xl">
            Continue
          </Button>

        </div>

      </div>
    </PageWrapper>
  );
};

export default SelectPlan;