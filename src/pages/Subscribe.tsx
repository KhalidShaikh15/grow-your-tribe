import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import banbrossLogo from "@/assets/banbross_logo.png";
import PageWrapper from "@/components/PageWrapper";

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
  const location = useLocation();

  // ✅ GET DATA FROM SELECT PAGE
  const plan = location.state?.plan;
  const quantity = location.state?.quantity;
  const amount = location.state?.amount;

  // ✅ PROTECT FLOW (IMPORTANT)
  useEffect(() => {
    if (!plan || !quantity || !amount) {
      navigate("/select-plan");
    }
  }, [plan, quantity, amount, navigate]);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    address: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData & { terms: string }>>({});

  const update = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData & { terms: string }> = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ""))) e.mobile = "10-digit mobile number required";
    if (!form.age || +form.age < 13 || +form.age > 120) e.age = "Valid age required";
    if (!form.gender) e.gender = "Select gender";
    if (!form.address.trim()) e.address = "Address required";
    if (!termsAccepted) e.terms = "You must accept the terms";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setProcessing(true);

    try {
      const docRef = await addDoc(collection(db, "submissions"), {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        age: Number(form.age),
        gender: form.gender,
        address: form.address.trim(),

        plan,
        quantity,
        amount: Number(amount),

        status: "pending",
        createdAt: serverTimestamp(),
      });

      navigate("/payment", {
  state: { plan, quantity }
});

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <PageWrapper>

      {/* NAV */}
      <nav className="flex items-center gap-4 px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm">
        <Link to="/select-plan" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <img src={banbrossLogo} className="w-7 h-7" />
          <span className="font-bold text-lg">BANBRO'SS INDIA</span>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Complete your membership</h1>
        </div>

       

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <Label>Full Name</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>

          <div>
            <Label>Mobile</Label>
            <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
            {errors.mobile && <p className="text-destructive text-xs">{errors.mobile}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Age</Label>
              <Input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} />
              {errors.age && <p className="text-destructive text-xs">{errors.age}</p>}
            </div>

            <div>
              <Label>Gender</Label>
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className="w-full h-10 border rounded-md px-2"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-destructive text-xs">{errors.gender}</p>}
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <textarea
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full border rounded-md px-2 py-2"
            />
            {errors.address && <p className="text-destructive text-xs">{errors.address}</p>}
          </div>

          <div className="bg-secondary/50 p-4 rounded-xl">
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="text-sm">
                I accept Terms & Conditions. No guaranteed returns.
              </span>
            </label>
            {errors.terms && <p className="text-destructive text-xs">{errors.terms}</p>}
          </div>

          <Button type="submit" className="w-full h-12" disabled={processing}>
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Proceed to Payment ₹${amount}`
            )}
          </Button>

        </form>
      </div>

    </PageWrapper>
  );
};

export default Subscribe;