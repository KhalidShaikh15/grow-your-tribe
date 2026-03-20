import { SubscriberCounter } from "@/components/SubscriberCounter";
import { PricingCard } from "@/components/PricingCard";
import { Link } from "react-router-dom";
import { Users, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <span className="font-bold text-lg text-foreground">SubsClub</span>
        <Link
          to="/admin"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Admin
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-3xl mx-auto">
        <h1 className="fade-up text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.08] mb-6">
          Join the movement.{" "}
          <span className="text-primary">Be part of something big.</span>
        </h1>
        <p className="fade-up fade-up-delay-1 text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
          We're building India's largest subscriber community. One plan, one price, unlimited value.
        </p>

        <SubscriberCounter />
      </section>

      {/* Trust signals */}
      <section className="px-6 md:px-12 py-16 bg-secondary/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Growing Fast", desc: "Thousands join every week" },
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

      {/* Pricing */}
      <section className="px-6 md:px-12 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          One plan. Everything included. No hidden fees.
        </p>
        <PricingCard />
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SubsClub. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
