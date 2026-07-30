import { Link } from "react-router-dom";
import logoMain from "../../assets/logo/logo-main.svg";
import { GraphicAccent } from "../ui/GraphicAccent";

export function SplitHero() {
  return (
    <section className="flex flex-col">
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-10 text-center flex flex-col items-center gap-6">
        <img src={logoMain} alt="ROUH" className="h-20 sm:h-28 w-auto" />
        <p className="max-w-xl text-black/60 text-base sm:text-lg">
          One brand, two ways to work with us: a creative agency that builds brands with intent, and a podcast studio you can rent to record your own show.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20 grid gap-6 sm:grid-cols-2">
        <Link
          to="/agency"
          className="group relative flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-8 hover:border-orange/40 transition-colors overflow-hidden"
        >
          <GraphicAccent
            variant={1}
            className="absolute -right-6 -top-6 h-32 w-32 opacity-15 group-hover:opacity-25 transition-opacity"
          />
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">ROUH Agency</span>
          <h2 className="text-3xl sm:text-4xl font-black text-black">
            Brands, built with intent.
          </h2>
          <p className="text-black/60 max-w-sm text-sm sm:text-base">
            Strategy, content, and growth for brands that want to move with purpose — a full creative team, not just another vendor.
          </p>
          <span className="inline-flex items-center gap-2 font-bold text-gold group-hover:gap-3 transition-all">
            Explore the Agency →
          </span>
        </Link>

        <Link
          to="/podcast"
          className="group relative flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-8 hover:border-orange/40 transition-colors overflow-hidden"
        >
          <GraphicAccent
            variant={4}
            className="absolute -right-6 -top-6 h-32 w-32 opacity-15 group-hover:opacity-25 transition-opacity"
          />
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">ROUH Studio</span>
          <h2 className="text-3xl sm:text-4xl font-black text-black">
            Rent the studio. Record your own show.
          </h2>
          <p className="text-black/60 max-w-sm text-sm sm:text-base">
            Book the room, the mics, and the crew — everything you need to produce your own podcast, on your terms.
          </p>
          <span className="inline-flex items-center gap-2 font-bold text-orange group-hover:gap-3 transition-all">
            Explore the Studio →
          </span>
        </Link>
      </div>
    </section>
  );
}

