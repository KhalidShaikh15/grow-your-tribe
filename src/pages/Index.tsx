import { Link } from "react-router-dom";
import { Users, Shield, Zap, CheckCircle2, AlertTriangle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import banbrossLogo from "@/assets/banbross_logo.png";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { HeroSection } from "@/components/HeroSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

const steps = [
  { num: "01", title: "Join the Program", desc: "Sign up with your details and make a one-time payment of ₹499." },
  { num: "02", title: "Become a Member", desc: "Get instant access to the BANBRO'SS INDIA community and platform." },
  { num: "03", title: "Be Part of the Journey", desc: "Participate in our long-term growth program alongside thousands of members." },
  { num: "04", title: "Future Benefits", desc: "Receive potential benefits based on platform performance and community growth." },
];

const trustPoints = [
  "Participation is completely voluntary",
  "No guaranteed returns — benefits depend on long-term performance",
  "Lock-in period of 5–7 years applies",
  "No early withdrawals permitted",
  "Full transparency in all communications",
];

const Index = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [count, setCount] = useState(0);

  // 🔥 Firebase live counter
  useEffect(() => {
    const q = query(
      collection(db, "submissions"),
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={banbrossLogo} alt="BANBRO'SS INDIA" className="w-10 h-10 object-contain" />
          <span className="font-bold text-lg text-foreground tracking-tight">BANBRO'SS INDIA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm text-muted-foreground hover:text-foreground">Home</a>
          <a href="#membership" className="text-sm text-muted-foreground hover:text-foreground">Membership</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          <Button size="sm" asChild>
            <Link to="/subscribe">Join Now</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileMenu && (
        <div className="md:hidden bg-card border-b px-6 py-4 space-y-3">
          <a href="#home" onClick={() => setMobileMenu(false)} className="block text-sm">Home</a>
          <a href="#membership" onClick={() => setMobileMenu(false)} className="block text-sm">Membership</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm">How It Works</a>
          <a href="#faq" onClick={() => setMobileMenu(false)} className="block text-sm">FAQ</a>
          <a href="#contact" onClick={() => setMobileMenu(false)} className="block text-sm">Contact</a>
          <Button size="sm" className="w-full" asChild>
            <Link to="/subscribe">Join Now</Link>
          </Button>
        </div>
      )}

      {/* ✅ Pass count to Hero */}
      <HeroSection count={count} />

      {/* Trust signals */}
      <section className="px-6 md:px-12 py-16 bg-secondary/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Growing Community", desc: "Thousands join every week" },
            { icon: Shield, title: "Secure Payments", desc: "256-bit encryption, always" },
            { icon: Zap, title: "Instant Access", desc: "Get started in under a minute" },
          ].map((item, i) => (
            <div key={item.title} className={`text-center`}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership section */}
      <section id="membership" className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Choose Your Membership
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border p-8">
              <h3 className="text-center font-semibold mb-2">Basic</h3>
              <p className="text-center text-2xl font-bold mb-6">₹499</p>
              <Button className="w-full" asChild>
                <Link to="/subscribe?plan=basic">Join</Link>
              </Button>
            </div>

            <div className="bg-card rounded-2xl border-2 border-primary p-8">
              <h3 className="text-center font-semibold mb-2">Premium</h3>
              <p className="text-center text-2xl font-bold mb-6">₹999</p>
              <Button className="w-full" asChild>
                <Link to="/subscribe?plan=premium">Join</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections */}
      <FAQSection />
      <ContactSection />

      <footer className="px-6 md:px-12 py-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BANBRO'SS INDIA
      </footer>
    </div>
  );
};

export default Index;