import type { GalleryItem } from "../../types";
import { GraphicAccent } from "../ui/GraphicAccent";

const accentVariants: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4];

export function StudioGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.id} className="group flex flex-col gap-2">
          <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center overflow-hidden border border-black/5">
            <GraphicAccent
              variant={accentVariants[index % accentVariants.length]}
              className="w-28 h-28 sm:w-32 sm:h-32 opacity-50 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-sm font-bold text-black mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

