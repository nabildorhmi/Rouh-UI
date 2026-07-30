import { GraphicAccent } from "../ui/GraphicAccent";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center overflow-hidden">
      <GraphicAccent
        variant={2}
        className="absolute top-2 left-[6%] w-36 h-36 sm:w-[180px] sm:h-[180px] opacity-50"
      />

      <div className="mx-auto max-w-[720px]">
        <SectionHeading
          eyebrow="About ROUH"
          title="Rouh means soul — that's the point."
          align="center"
          description="ROUH exists at the intersection of strategy and craft. The agency builds brands with intent; the studio gives other creators the room and gear to do the same for their own show. Same point of view, two ways to work with us."
        />
      </div>
    </section>
  );
}
