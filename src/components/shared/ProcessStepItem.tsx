interface ProcessStepItemProps {
  step: number;
  title: string;
  description: string;
}

export function ProcessStepItem({ step, title, description }: ProcessStepItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
        Step {step}
      </span>
      <h3 className="text-2xl font-black text-black">{title}</h3>
      <p className="text-base text-black/60">{description}</p>
    </div>
  );
}
