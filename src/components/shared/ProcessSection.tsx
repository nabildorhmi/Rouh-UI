import { motion, useReducedMotion } from "motion/react";
import type { ProcessStep } from "../../types";
import { SectionHeading } from "../ui/SectionHeading";
import { ProcessStepItem } from "./ProcessStepItem";

interface ProcessSectionProps {
  steps: ProcessStep[];
  eyebrow?: string;
  title: string;
  description?: string;
}

export function ProcessSection({
  steps,
  eyebrow,
  title,
  description,
}: ProcessSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (steps.length === 0) {
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
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.step}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          >
            <ProcessStepItem
              step={step.step}
              title={step.title}
              description={step.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
