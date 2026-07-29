import { motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "../../types";
import { SectionHeading } from "../ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  eyebrow?: string;
  title: string;
  description?: string;
}

export function TestimonialsSection({
  testimonials,
  eyebrow,
  title,
  description,
}: TestimonialsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />
      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
