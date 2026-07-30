import type { PortfolioItem } from "../../types";
import { GraphicAccent } from "../ui/GraphicAccent";

const accentVariants: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  dark?: boolean;
}

export function PortfolioShowcase({ items, dark = false }: PortfolioShowcaseProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.title} className="group flex flex-col gap-3">
          <div
            className={`relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center overflow-hidden ${
              dark ? "border border-white/10" : "border border-black/5"
            }`}
          >
            <GraphicAccent
              variant={accentVariants[index % accentVariants.length]}
              className="w-28 h-28 sm:w-36 sm:h-36 opacity-50 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-[0.15em] ${
                dark ? "text-gold" : "text-orange"
              }`}
            >
              {item.category}
            </span>
            <h3 className={`text-base font-black mt-1 ${dark ? "text-white" : "text-black"}`}>
              {item.title}
            </h3>
            <p className={`text-sm mt-1 leading-relaxed ${dark ? "text-white/65" : "text-black/60"}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

