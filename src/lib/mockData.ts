export const SUBSCRIBER_GOAL = 700000;
export const CURRENT_SUBSCRIBERS = 124532;
export const PLAN_PRICE = 499;

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  gender: string;
  address: string;
  subscribedAt: string;
}

const names = [
  "Aarav Sharma", "Priya Patel", "Rohan Gupta", "Ananya Singh", "Vikram Reddy",
  "Sneha Desai", "Arjun Nair", "Meera Joshi", "Karthik Iyer", "Pooja Mehta",
  "Rahul Verma", "Divya Kapoor", "Aditya Kumar", "Neha Choudhury", "Sanjay Mishra",
  "Kavya Rao", "Harsh Agarwal", "Ritu Bhat", "Manish Tiwari", "Shreya Das",
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"];

function randomDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toISOString();
}

export const mockSubscribers: Subscriber[] = names.map((name, i) => ({
  id: `sub_${(i + 1).toString().padStart(5, "0")}`,
  name,
  email: name.toLowerCase().replace(/\s/g, ".") + "@example.com",
  mobile: `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`,
  age: 18 + Math.floor(Math.random() * 40),
  gender: Math.random() > 0.5 ? "Male" : "Female",
  address: `${Math.floor(1 + Math.random() * 500)}, Sector ${Math.floor(1 + Math.random() * 50)}, ${cities[i % cities.length]}`,
  subscribedAt: randomDate(90),
}));

export const dailyGrowth = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
  subscribers: Math.floor(3000 + Math.random() * 2000),
}));

export function formatIndianNumber(n: number): string {
  const s = n.toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formatted + "," + last3;
}
