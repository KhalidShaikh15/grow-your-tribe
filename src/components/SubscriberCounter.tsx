import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SUBSCRIBER_GOAL, formatIndianNumber } from "@/lib/mockData";

export function SubscriberCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);
  const percentage = Math.min((count / SUBSCRIBER_GOAL) * 100, 100);

  useEffect(() => {
    async function fetchCount() {
      try {
        const snapshot = await getCountFromServer(collection(db, "subscribers"));
        setTarget(snapshot.data().count);
      } catch {
        setTarget(0);
      }
    }
    fetchCount();
  }, []);

  useEffect(() => {
    if (target === 0) return;
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="fade-up w-full max-w-xl mx-auto">
      <p className="text-muted-foreground text-sm font-medium mb-3 uppercase tracking-wide">
        Live member count
      </p>
      <div className="flex items-baseline justify-center gap-2 mb-4">
        <span className="counter-text text-5xl md:text-6xl font-bold text-foreground">
          {formatIndianNumber(count)}
        </span>
        <span className="text-muted-foreground text-lg">
          / {formatIndianNumber(SUBSCRIBER_GOAL)}
        </span>
      </div>

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
