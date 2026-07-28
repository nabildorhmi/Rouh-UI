import type { GuestTier } from "../../types";
import { Button } from "../ui/Button";
import { GraphicAccent } from "../ui/GraphicAccent";

interface GuestTierCardProps {
  tier: GuestTier;
  onSelect: (tier: GuestTier) => void;
}

export function GuestTierCard({ tier, onSelect }: GuestTierCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 gap-6 ${
        tier.highlighted ? "border-orange bg-black text-white shadow-xl" : "border-black/10 bg-white"
      }`}
    >
      <GraphicAccent
        variant={3}
        className={`absolute top-6 right-6 h-10 w-10 ${tier.highlighted ? "opacity-30" : "opacity-15"}`}
      />

      <div>
        <h3 className={`text-2xl font-black ${tier.highlighted ? "text-white" : "text-black"}`}>
          {tier.name}
        </h3>
        <p className={`mt-2 text-sm ${tier.highlighted ? "text-white/70" : "text-black/60"}`}>
          {tier.tagline}
        </p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-gradient-brand">{tier.price}</span>
        <span className={`text-xs ${tier.highlighted ? "text-white/50" : "text-black/40"}`}>
          {/* placeholder price — TBD */}
          per slot, placeholder
        </span>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${
              tier.highlighted ? "text-white/90" : "text-black/80"
            }`}
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-brand shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={tier.highlighted ? "primary" : "secondary"}
        onClick={() => onSelect(tier)}
        className="w-full"
      >
        Book this slot
      </Button>
    </div>
  );
}
