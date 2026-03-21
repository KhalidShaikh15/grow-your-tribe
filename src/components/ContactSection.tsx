import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 bg-secondary/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Get In Touch
        </h2>
        <p className="text-muted-foreground mb-10">
          Have questions? We're here to help. Reach out to us anytime.
        </p>

        <div className="bg-card rounded-2xl border p-8 max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-0.5">Email us at</p>
              <a
                href="mailto:banbrossindia@gmail.com"
                className="font-semibold text-lg text-foreground hover:text-primary transition-colors"
              >
                banbrossindia@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
