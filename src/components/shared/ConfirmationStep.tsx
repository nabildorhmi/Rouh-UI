import { LinkButton } from "../ui/Button";
import { GraphicAccent } from "../ui/GraphicAccent";

interface ConfirmationStepProps {
  name: string;
  calendlyUrl: string;
}

export function ConfirmationStep({ name, calendlyUrl }: ConfirmationStepProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-4">
      <GraphicAccent variant={2} className="h-14 w-14 opacity-80" />
      <h3 className="text-xl font-black text-black">Thanks, {name.split(" ")[0] || "there"}!</h3>
      <p className="text-sm text-black/60 max-w-sm">
        We've got your details. The last step is picking a time that works for you.
      </p>
      <LinkButton href={calendlyUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
        Book your call
      </LinkButton>
      <p className="text-xs text-black/30">
        {/* Placeholder Calendly link — swap CALENDLY_LINKS in src/data/config.ts */}
        Calendar link is a placeholder for now.
      </p>
    </div>
  );
}
