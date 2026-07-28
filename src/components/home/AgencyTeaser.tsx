import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { SectionHeading } from "../ui/SectionHeading";

export function AgencyTeaser() {
  const highlights = services.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="mb-10">
        <SectionHeading eyebrow="ROUH Agency" title="What the agency does" />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {highlights.map((service) => (
          <div key={service.title} className="rounded-2xl border border-black/10 p-6">
            <h3 className="font-black text-black">{service.title}</h3>
            <p className="mt-2 text-sm text-black/60">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/agency"
          className="inline-flex items-center gap-2 font-bold text-orange hover:gap-3 transition-all"
        >
          See services &amp; plans →
        </Link>
      </div>
    </section>
  );
}
