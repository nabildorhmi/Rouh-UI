import { Link } from "react-router-dom";
import { episodes } from "../../data/episodes";
import { SectionHeading } from "../ui/SectionHeading";

export function PodcastTeaser() {
  const highlights = episodes.slice(0, 2);

  return (
    <section className="bg-black/[0.02] border-y border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <SectionHeading eyebrow="ROUH Podcast" title="Latest episodes" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((episode) => (
            <div key={episode.id} className="rounded-2xl border border-black/10 bg-white p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-black/40">
                {episode.duration}
              </span>
              <h3 className="font-black text-black mt-1">{episode.title}</h3>
              <p className="mt-2 text-sm text-black/60">{episode.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/podcast"
            className="inline-flex items-center gap-2 font-bold text-orange hover:gap-3 transition-all"
          >
            Listen to episodes &amp; book a guest slot →
          </Link>
        </div>
      </div>
    </section>
  );
}
