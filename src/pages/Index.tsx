import { Link } from "react-router-dom";
import { Users, Shield, Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import banbrossLogo from "@/assets/banbross_logo.png";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { HeroSection } from "@/components/HeroSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

const steps = [
  { num: "01", title: "Join the Program", desc: "Sign up and select your membership plan." },
  { num: "02", title: "Complete Details", desc: "Fill in your personal details once." },
  { num: "03", title: "Make Payment", desc: "Pay via UPI using QR or payment link." },
  { num: "04", title: "Get Verified", desc: "Admin verifies your payment and confirms your membership." },
];

const Index = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [count, setCount] = useState(0);

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

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={banbrossLogo} className="w-10 h-10" />
          <span className="font-bold text-lg">BANBRO'SS INDIA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm hover:text-foreground">Home</a>
          <a href="#membership" className="text-sm hover:text-foreground">Membership</a>
          <a href="#how-it-works" className="text-sm hover:text-foreground">How It Works</a>
          <a href="#faq" className="text-sm hover:text-foreground">FAQ</a>
          <a href="#contact" className="text-sm hover:text-foreground">Contact</a>

          <Button size="sm" asChild>
            <Link to="/select-plan?plan=basic">Join Now</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-card border-b px-6 py-4 flex flex-col gap-4">

  <a href="#home" className="block">Home</a>
  <a href="#membership" className="block">Membership</a>
  <a href="#how-it-works" className="block">How It Works</a>
  <a href="#faq" className="block">FAQ</a>
  <a href="#contact" className="block">Contact</a>

</div>
      )}

      {/* HERO */}
      <HeroSection count={count} />

      {/* TRUST */}
      <section className="px-6 md:px-12 py-16 bg-secondary/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[ 
            { icon: Users, title: "Growing Community", desc: "Thousands joining daily" },
            { icon: Shield, title: "Secure Payments", desc: "Safe & verified transactions" },
            { icon: Zap, title: "Fast Process", desc: "Quick onboarding experience" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <item.icon className="mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="px-6 md:px-12 py-24 relative">

  {/* Background glow */}
  <div className="absolute inset-0 hero-gradient pointer-events-none" />

  <div className="max-w-5xl mx-auto relative z-10">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Choose Your Membership
      </h2>
      <p className="text-muted-foreground">
        Start your journey with BANBRO'S INDIA today
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

      {/* BASIC PLAN */}
      <div className="relative p-8 rounded-3xl bg-card border shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">

        <h3 className="text-lg font-semibold mb-2">Basic</h3>

        <p className="text-4xl font-bold mb-4">₹499</p>

        <p className="text-sm text-muted-foreground mb-6">
          Perfect to get started with our community
        </p>

        <ul className="text-sm text-muted-foreground space-y-2 mb-8">
          <li>✔ Entry to community</li>
          <li>✔ Long-term participation</li>
          <li>✔ Regular updates</li>
        </ul>

        <Button className="w-full h-12 rounded-xl" asChild>
          <Link to="/select-plan?plan=basic">Get Started</Link>
        </Button>
      </div>

      {/* PREMIUM PLAN */}
      <div className="relative p-8 rounded-3xl border-2 border-primary bg-gradient-to-b from-white/80 to-white/40 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">

        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-4 py-1.5 rounded-full shadow-md">
          Most Popular
        </div>

        <h3 className="text-lg font-semibold mb-2">Premium</h3>

        <p className="text-4xl font-bold mb-4 gradient-text">₹999</p>

        <p className="text-sm text-muted-foreground mb-6">
          Best for maximum participation and benefits
        </p>

        <ul className="text-sm text-muted-foreground space-y-2 mb-8">
          <li>✔ All Basic features</li>
          <li>✔ Priority support</li>
          <li>✔ Higher participation weight</li>
        </ul>

        <Button className="w-full h-12 rounded-xl" asChild>
          <Link to="/select-plan?plan=premium">Get Premium</Link>
        </Button>
      </div>

    </div>

  </div>
</section>

      {/* ✅ HOW IT WORKS (FIXED) */}
      <section id="how-it-works" className="px-6 md:px-12 py-24 relative">

  {/* Background glow */}
  <div className="absolute inset-0 hero-gradient pointer-events-none" />

  <div className="max-w-5xl mx-auto relative z-10">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        How It Works
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        A simple and transparent process to become part of BANBRO'S INDIA
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-border -translate-x-1/2 hidden md:block" />

      <div className="space-y-12">

        {steps.map((step, index) => (
          <div
            key={step.num}
            className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >

            {/* Content */}
            <div className="w-full md:w-1/2">
              <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground">
                  {step.desc}
                </p>

              </div>
            </div>

            {/* Dot */}
            <div className="hidden md:flex items-center justify-center w-10">
              <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:w-1/2" />

          </div>
        ))}

      </div>

    </div>

  </div>
</section>

      {/* FAQ + CONTACT */}
      <FAQSection />
      <ContactSection />

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} BANBRO'S INDIA
      </footer>

    </div>
  );
};

export default Index;