import type { Plan } from "../../types";
import { Button } from "../ui/Button";
import { GraphicAccent } from "../ui/GraphicAccent";

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 gap-6 ${
        plan.highlighted ? "border-orange bg-black text-white shadow-xl" : "border-black/10 bg-white"
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white">
          Most popular
        </span>
      )}

      <GraphicAccent
        variant={1}
        className={`absolute top-6 right-6 h-10 w-10 ${plan.highlighted ? "opacity-30" : "opacity-15"}`}
      />

      <div>
        <h3 className={`text-2xl font-black ${plan.highlighted ? "text-white" : "text-black"}`}>
          {plan.name}
        </h3>
        <p className={`mt-2 text-sm ${plan.highlighted ? "text-white/70" : "text-black/60"}`}>
          {plan.tagline}
        </p>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${
              plan.highlighted ? "text-white/90" : "text-black/80"
            }`}
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-brand shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlighted ? "primary" : "secondary"}
        onClick={() => onSelect(plan)}
        className="w-full"
      >
        Select this plan
      </Button>
    </div>
  );
}
