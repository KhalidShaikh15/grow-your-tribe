import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is this membership program?",
    answer:
      "BANBRO'SS INDIA is a long-term community membership program. By joining, you become part of a growing network of members who participate in the platform's journey. This is not an investment scheme — it is a membership-based community program focused on collective growth.",
  },
  {
    question: "How do I join?",
    answer:
      "Simply click the \"Join Now\" button, fill in your details (name, email, mobile, age, gender, and address), accept the terms and conditions, and complete the one-time payment of ₹499 (Basic) or ₹999 (Premium). You'll receive instant confirmation and a downloadable receipt.",
  },
  {
    question: "Is there any guaranteed return?",
    answer:
      "No. There are no guaranteed returns of any kind. Participation is entirely voluntary, and any potential future benefits will depend solely on the long-term performance and growth of the platform and community. Please join only if you understand and accept this.",
  },
  {
    question: "How long is the program duration?",
    answer:
      "The program has a long-term commitment period of 5–7 years. This means your membership is designed for sustained participation over this duration. Early exit is not supported.",
  },
  {
    question: "Can I cancel or withdraw early?",
    answer:
      "No. Once you join, early cancellations or withdrawals are not permitted. The program is structured as a long-term commitment, and all members are expected to remain part of the community for the full duration of 5–7 years.",
  },
  {
    question: "How will future benefits be decided?",
    answer:
      "Any potential future benefits will be determined based on the overall performance of the platform, community growth, and other relevant factors. Decisions will be communicated transparently to all members. There is no fixed formula or guarantee.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="px-6 md:px-12 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-muted-foreground text-center mb-10">
          Find answers to the most common questions about the program.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-2xl border px-6 data-[state=open]:shadow-sm transition-shadow"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
