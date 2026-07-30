import { Link } from "react-router-dom";
import { packages } from "../../data/packages";
import { SectionHeading } from "../ui/SectionHeading";

export function PodcastTeaser() {
  const highlights = packages.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="mb-10">
        <SectionHeading eyebrow="ROUH Studio" title="What you can rent" />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {highlights.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-black/10 p-6">
            <span className="text-xs font-bold uppercase tracking-wide text-black/40">
              {pkg.duration}
            </span>
            <h3 className="font-black text-black mt-1">{pkg.name}</h3>
            <p className="mt-2 text-sm text-black/60">{pkg.tagline}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/podcast"
          className="inline-flex items-center gap-2 font-bold text-orange hover:gap-3 transition-all"
        >
          See packages &amp; book a session →
        </Link>
      </div>
    </section>
  );
}

