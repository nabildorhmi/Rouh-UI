import { Link, useNavigate } from "react-router-dom";
import { packages } from "../../data/packages";
import { CALENDLY_LINKS } from "../../data/config";
import { GraphicAccent } from "../ui/GraphicAccent";

export function PodcastTeaser() {
  const highlights = packages.slice(0, 3);
  const navigate = useNavigate();

  const handleReserve = (packageId: string) => {
    navigate("/podcast", { state: { autoOpenPackageId: packageId } });
  };

  return (
    <section className="relative overflow-hidden bg-charcoal text-white py-16 sm:py-20">
      <GraphicAccent
        variant={4}
        className="absolute -bottom-10 right-4 sm:right-[4%] w-60 h-60 sm:w-72 sm:h-72 opacity-50 text-gold pointer-events-none"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <span className="eyebrow text-gold">ROUH Studio</span>
        <h2 className="mt-2 mb-8 text-3xl font-black text-white">What you can rent</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition-colors hover:border-orange/40"
            >
              <div>
                <span className="eyebrow text-white/40">{pkg.duration}</span>
                <h3 className="mt-1.5 text-lg font-black text-white">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{pkg.tagline}</p>
              </div>

              <button
                type="button"
                onClick={() => handleReserve(pkg.id)}
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-extrabold text-gold transition-colors hover:bg-gold hover:text-black cursor-pointer"
              >
                Reserve this →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 font-bold text-gold hover:gap-3 transition-all text-sm sm:text-base"
          >
            See all packages →
          </Link>
          <a
            href={CALENDLY_LINKS.podcast}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 hover:text-white transition-colors"
          >
            Already know what you want? Skip the form, grab a time on our calendar →
          </a>
        </div>
      </div>
    </section>
  );
}
