import { Link } from "react-router-dom";
import logoMain from "../../assets/logo/logo-main.svg";
import { GraphicAccent } from "../ui/GraphicAccent";

export function SplitHero() {
  return (
    <section className="flex flex-col">
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-10 text-center flex flex-col items-center gap-6">
        <img src={logoMain} alt="ROUH" className="h-20 sm:h-28 w-auto" />
        <p className="max-w-xl text-black/60 text-base sm:text-lg">
          One brand, two activities — a creative agency and an original podcast, built on the same
          point of view.
        </p>
      </div>

      <div className="grid sm:grid-cols-2">
        <Link
          to="/agency"
          className="group relative overflow-hidden bg-black text-white px-8 py-16 sm:py-24 flex flex-col justify-end gap-4 min-h-[22rem]"
        >
          <GraphicAccent
            variant={1}
            className="absolute -right-6 -top-6 h-40 w-40 opacity-15 group-hover:opacity-25 transition-opacity"
          />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">ROUH Agency</span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Brands, built with intent.
          </h2>
          <p className="text-white/60 max-w-sm text-sm sm:text-base">
            Strategy, content, and growth for brands that want to move with purpose. Placeholder
            pitch copy.
          </p>
          <span className="inline-flex items-center gap-2 font-bold text-gold group-hover:gap-3 transition-all">
            Explore the Agency →
          </span>
        </Link>

        <Link
          to="/podcast"
          className="group relative overflow-hidden bg-white text-black px-8 py-16 sm:py-24 flex flex-col justify-end gap-4 min-h-[22rem] border-t sm:border-t-0 sm:border-l border-black/10"
        >
          <GraphicAccent
            variant={4}
            className="absolute -right-6 -top-6 h-40 w-40 opacity-15 group-hover:opacity-25 transition-opacity"
          />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">ROUH Podcast</span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Conversations with soul.
          </h2>
          <p className="text-black/60 max-w-sm text-sm sm:text-base">
            Honest conversations on creativity, business, and culture. Placeholder pitch copy.
          </p>
          <span className="inline-flex items-center gap-2 font-bold text-orange group-hover:gap-3 transition-all">
            Explore the Podcast →
          </span>
        </Link>
      </div>
    </section>
  );
}
