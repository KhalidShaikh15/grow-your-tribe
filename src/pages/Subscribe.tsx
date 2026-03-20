import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  age: string;
  gender: string;
  address: string;
}

const Subscribe = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: "", email: "", mobile: "", age: "", gender: "", address: "",
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const update = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ""))) e.mobile = "10-digit mobile number required";
    if (!form.age || +form.age < 13 || +form.age > 120) e.age = "Valid age required";
    if (!form.gender) e.gender = "Select gender";
    if (!form.address.trim()) e.address = "Address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);

    navigate("/confirmation", { state: { subscriber: { ...form, id: "sub_" + Date.now(), subscribedAt: new Date().toISOString() } } });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center gap-4 px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-bold text-lg text-foreground">Subscribe</span>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="fade-up mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Complete your subscription</h1>
          <p className="text-muted-foreground">Fill in your details below. Total: <span className="font-semibold text-foreground">₹499</span></p>
        </div>

        <form onSubmit={handleSubmit} className="fade-up fade-up-delay-1 space-y-5">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Aarav Sharma" className="mt-1.5" />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="aarav@example.com" className="mt-1.5" />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="9876543210" className="mt-1.5" />
            {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="25" className="mt-1.5" />
              {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <textarea
              id="address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123, Sector 15, Mumbai"
              rows={3}
              className="mt-1.5 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
            {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Membership Plan</span>
              <span className="font-semibold text-foreground">₹499</span>
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full h-12 rounded-xl" disabled={processing}>
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay ₹499 & Subscribe"
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Demo mode — no real payment will be charged
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
