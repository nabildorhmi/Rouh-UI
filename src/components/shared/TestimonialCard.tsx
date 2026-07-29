import type { Testimonial } from "../../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/10 p-6">
      <p className="text-base text-black/80">&ldquo;{testimonial.quote}&rdquo;</p>
      <div>
        <p className="text-sm font-bold text-black">{testimonial.name}</p>
        <p className="text-sm text-black/60">{testimonial.role}</p>
      </div>
    </div>
  );
}
