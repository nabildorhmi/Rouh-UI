import { GraphicAccent } from "../ui/GraphicAccent";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 overflow-hidden">
      <GraphicAccent variant={2} className="absolute left-0 top-0 h-32 w-32 -translate-x-1/3 -translate-y-1/4 opacity-10" />

      <SectionHeading
        eyebrow="About ROUH"
        title="Rouh means soul — that's the point."
        align="center"
        description="ROUH exists at the intersection of strategy and craft. The agency builds brands with intent; the studio gives other creators the room and gear to do the same for their own show. Same point of view, two ways to work with us."
      />
    </section>
  );
}
