import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  "Full platform access",
  "Exclusive member content",
  "Priority support",
  "Community access",
  "Monthly updates & reports",
];

export function PricingCard() {
  const navigate = useNavigate();

  return (
    <div className="fade-up fade-up-delay-2 card-hover bg-card rounded-2xl border p-8 max-w-sm mx-auto shadow-sm">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide mb-1">
          Membership Plan
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">₹499</span>
          <span className="text-muted-foreground">/one-time</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-foreground">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" />
            </span>
            <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="hero"
        size="lg"
        className="w-full h-12 rounded-xl"
        onClick={() => navigate("/subscribe")}
      >
        Subscribe Now — ₹499
      </Button>
    </div>
  );
}
