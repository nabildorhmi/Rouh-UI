import type { Episode } from "../../types";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const formattedDate = new Date(episode.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col sm:flex-row gap-5 rounded-2xl border border-black/10 p-6">
      {/* Placeholder audio/video embed */}
      <div className="sm:w-48 aspect-video sm:aspect-square shrink-0 rounded-xl bg-gradient-to-br from-gold/20 to-orange/20 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-orange/70 text-center px-2">
          Player embed placeholder
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs text-black/40 font-bold uppercase tracking-wide">
          <time dateTime={episode.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{episode.duration}</span>
        </div>
        <h3 className="text-lg font-black text-black">{episode.title}</h3>
        <p className="text-sm text-black/60">{episode.description}</p>
      </div>
    </article>
  );
}
