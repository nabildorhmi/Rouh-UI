import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../../types";

export function StudioFaq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <details key={item.id} className="group rounded-2xl border border-black/10 p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-black">
            {item.question}
            <ChevronDown className="h-5 w-5 text-orange transition-transform group-open:rotate-180 shrink-0" />
          </summary>
          <p className="mt-3 text-sm text-black/60">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
