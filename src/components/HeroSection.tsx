import { Link } from "react-router-dom";
import { Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriberCounter } from "@/components/SubscriberCounter";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community growth and collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-4xl mx-auto">
        <div className="fade-up inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm">
          <Users className="w-4 h-4" />
          Building India's Largest Member Community
        </div>

        <h1 className="fade-up fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.08] mb-6">
          Join{" "}
          <span className="gradient-text">7,00,000 Members</span>
        </h1>
        <p className="fade-up fade-up-delay-2 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Be part of India's fastest-growing membership community. One plan, one purpose — long-term participation and community growth.
        </p>

        <SubscriberCounter />

        <div className="fade-up fade-up-delay-3 mt-10">
          <Button variant="hero" size="lg" className="h-14 px-10 rounded-2xl text-base" asChild>
            <Link to="/subscribe">
              Join Now for ₹499
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
