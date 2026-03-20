import { useEffect, useState } from "react";
import { SUBSCRIBER_GOAL, CURRENT_SUBSCRIBERS, formatIndianNumber } from "@/lib/mockData";

export function SubscriberCounter() {
  const [count, setCount] = useState(0);
  const percentage = Math.min((count / SUBSCRIBER_GOAL) * 100, 100);

  useEffect(() => {
    const target = CURRENT_SUBSCRIBERS;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(eased * target);
      setCount(current);

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fade-up w-full max-w-xl mx-auto">
      <p className="text-muted-foreground text-sm font-medium mb-2 uppercase tracking-wide">
        Live subscriber count
      </p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="counter-text text-5xl md:text-6xl font-bold text-foreground">
          {formatIndianNumber(count)}
        </span>
        <span className="text-muted-foreground text-lg">
          / {formatIndianNumber(SUBSCRIBER_GOAL)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="progress-fill h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-muted-foreground text-sm mt-2">
        {percentage.toFixed(1)}% of our goal reached
      </p>
    </div>
  );
}
