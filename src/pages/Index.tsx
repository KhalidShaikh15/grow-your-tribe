import { Link } from "react-router-dom";
import { Users, Shield, Zap, CheckCircle2, AlertTriangle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import banbrossLogo from "@/assets/banbross_logo.png";
import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={banbrossLogo} alt="BANBRO'SS INDIA" className="w-10 h-10 object-contain" />
          <span className="font-bold text-lg text-foreground tracking-tight">BANBRO'SS INDIA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="#membership" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Membership</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <Button size="sm" asChild>
            <Link to="/subscribe">Join Now</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileMenu && (
        <div className="md:hidden bg-card border-b px-6 py-4 space-y-3 sticky top-[57px] z-30">
          <a href="#home" onClick={() => setMobileMenu(false)} className="block text-sm text-muted-foreground hover:text-foreground">Home</a>
          <a href="#membership" onClick={() => setMobileMenu(false)} className="block text-sm text-muted-foreground hover:text-foreground">Membership</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="block text-sm text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#faq" onClick={() => setMobileMenu(false)} className="block text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          <a href="#contact" onClick={() => setMobileMenu(false)} className="block text-sm text-muted-foreground hover:text-foreground">Contact</a>
          <Button size="sm" className="w-full" asChild>
            <Link to="/subscribe">Join Now</Link>
          </Button>
        </div>
      )}

      {/* Hero with background image */}
      <HeroSection />

      {/* Trust signals */}
      <section className="px-6 md:px-12 py-16 bg-secondary/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Growing Community", desc: "Thousands join every week" },
            { icon: Shield, title: "Secure Payments", desc: "256-bit encryption, always" },
            { icon: Zap, title: "Instant Access", desc: "Get started in under a minute" },
          ].map((item, i) => (
            <div key={item.title} className={`fade-up fade-up-delay-${i + 1} text-center`}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership section */}
      <section id="membership" className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
            Choose Your Membership
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Join the BANBRO'SS INDIA community with a plan that fits you. Both plans offer lifetime access to our long-term growth program.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start">
            <div className="card-hover bg-card rounded-2xl border p-8 shadow-sm">
              <div className="text-center mb-8">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide mb-2">Basic Membership</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-foreground">₹499</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {["Full platform access", "Community participation", "Regular updates & reports", "Long-term participation benefits"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-foreground">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full h-12 rounded-xl" asChild>
                <Link to="/subscribe?plan=basic">Join Basic — ₹499</Link>
              </Button>
            </div>

            <div className="card-hover bg-card rounded-2xl border-2 border-primary p-8 shadow-md relative md:scale-[1.03] origin-top">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">Most Popular</span>
              </div>
              <div className="text-center mb-8 mt-2">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide mb-2">Premium Membership</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-foreground">₹999</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {["Full platform access", "Community participation", "Priority access & communication", "Exclusive member content", "Potential future benefits based on performance"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-foreground">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="w-full h-12 rounded-xl" asChild>
                <Link to="/subscribe?plan=premium">Join Premium — ₹999</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 md:px-12 py-20 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground text-center mb-12">A simple 4-step process to become a member</p>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className={`fade-up fade-up-delay-${i + 1} bg-card rounded-2xl border p-6`}>
                <span className="counter-text text-3xl font-bold text-primary/20">{step.num}</span>
                <h3 className="font-semibold text-foreground mt-2 mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-accent" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trust & Transparency</h2>
          </div>
          <p className="text-muted-foreground text-center mb-10">
            We believe in complete transparency. Please read these important points before joining.
          </p>
          <div className="bg-card rounded-2xl border p-8 space-y-4">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">B</span>
            </div>
            <span className="font-bold text-sm text-foreground">BANBRO'SS INDIA</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} BANBRO'SS INDIA. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
