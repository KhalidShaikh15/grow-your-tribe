import { Link } from "react-router-dom";
import { Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection({ count }: { count: number }) {
  const goal = 700000;
  const progress = (count / goal) * 100;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-16 pb-20 text-center max-w-4xl mx-auto">
        
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm mb-8">
          <Users className="w-4 h-4" />
          Building India's Largest Member Community
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Join <span className="gradient-text">7,00,000 Members</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-10">
          Be part of India's fastest-growing membership community.
        </p>

        {/* ✅ LIVE COUNTER */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold">
            {count.toLocaleString()} / {goal.toLocaleString()}
          </h2>
        </div>

        {/* ✅ PROGRESS BAR */}
        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 mb-10">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Button size="lg" className="h-14 px-10 rounded-2xl" asChild>
          <Link to="/subscribe">
            Join Now for ₹499
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

      </div>
    </section>
  );
}