export const SUBSCRIBER_GOAL = 700000;

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: string;
  address: string;
  plan: string;
  amount: number;
  subscribedAt: string;
  status: string;
}

export function formatIndianNumber(n: number): string {
  const s = n.toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formatted + "," + last3;
}
