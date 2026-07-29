import type { GalleryItem } from "../../types";

export function StudioGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-orange/20" />
          <span className="text-sm font-bold text-black mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
