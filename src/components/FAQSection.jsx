"use client";


import { AnimatedText } from './AnimatedText';
import { FAQItem } from './FAQItem';

export const FAQSection = () => {
  const faqs = [
    { q: "How long does it take?", a: "Most projects are completed within 4–10 days depending on scope." },
    { q: "How much does it cost?", a: "Pricing varies based on requirements. Contact us for a free quote." },
    { q: "Do you provide hosting?", a: "Yes. We handle deployment, security, and setup." },
    { q: "Do you provide photography?", a: "Yes. Professional photography is available for clinics, restaurants, offices, and local businesses." },
    { q: "Do you redesign existing websites?", a: "Absolutely. We can redesign, optimize, and modernize existing websites." },
    { q: "Do you offer support?", a: "Every project includes 1 year of support and updates." }
  ];

  return (
    <section id="faq" className="py-[160px] px-6 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-24 text-center">
          <AnimatedText text="Frequently Asked Questions" className="text-[5rem] font-bold tracking-tighter text-blue-orbit-navy" el="h2" />
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};
