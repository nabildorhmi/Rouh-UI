interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange">{eyebrow}</span>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-black">{title}</h2>
      {description && <p className="text-base text-black/60 font-normal">{description}</p>}
    </div>
  );
}
