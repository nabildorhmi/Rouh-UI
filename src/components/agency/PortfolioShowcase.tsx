import type { PortfolioItem } from "../../types";

export function PortfolioShowcase({ items }: { items: PortfolioItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-3">
          {/* Placeholder visual — swap for a real project image */}
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange/70">
              Placeholder image
            </span>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-orange">
              {item.category}
            </span>
            <h3 className="text-base font-black text-black mt-1">{item.title}</h3>
            <p className="text-sm text-black/60 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
