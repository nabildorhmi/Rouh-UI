import type { RentalPackage } from "../../types";
import { Button } from "../ui/Button";
import { GraphicAccent } from "../ui/GraphicAccent";
import { Check } from "lucide-react";

interface PackageCardProps {
  pkg: RentalPackage;
  onSelect: (pkg: RentalPackage) => void;
}

export function PackageCard({ pkg, onSelect }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 gap-6 ${
        pkg.highlighted ? "border-orange bg-black text-white shadow-xl" : "border-black/10 bg-white"
      }`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white">
          Most popular
        </span>
      )}

      <GraphicAccent
        variant={3}
        className={`absolute top-6 right-6 h-10 w-10 ${pkg.highlighted ? "opacity-30" : "opacity-15"}`}
      />

      <div>
        <h3 className={`text-2xl font-black ${pkg.highlighted ? "text-white" : "text-black"}`}>
          {pkg.name}
        </h3>
        <p className={`mt-2 text-sm ${pkg.highlighted ? "text-white/70" : "text-black/60"}`}>
          {pkg.tagline}
        </p>
        <p className={`mt-2 text-xs font-bold uppercase tracking-wide ${pkg.highlighted ? "text-white/50" : "text-black/40"}`}>
          {pkg.duration} · {pkg.staffing === "dry-hire" ? "Dry-hire" : "Staffed"} · {pkg.gearTier} gear
        </p>
      </div>

      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wide ${pkg.highlighted ? "text-white/50" : "text-black/40"}`}>
          What's included
        </h4>
        <ul className="mt-2 flex flex-col gap-2">
          {pkg.equipment.map((item) => (
            <li
              key={item}
              className={`flex items-center gap-2 text-sm ${
                pkg.highlighted ? "text-white/90" : "text-black/80"
              }`}
            >
              <Check className="h-4 w-4 text-orange shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${
              pkg.highlighted ? "text-white/90" : "text-black/80"
            }`}
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-brand shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={pkg.highlighted ? "primary" : "secondary"}
        onClick={() => onSelect(pkg)}
        className="w-full"
      >
        Book this session
      </Button>
    </div>
  );
}
