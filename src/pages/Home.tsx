import { SplitHero } from "../components/home/SplitHero";
import { AboutSection } from "../components/home/AboutSection";
import { AgencyTeaser } from "../components/home/AgencyTeaser";
import { PodcastTeaser } from "../components/home/PodcastTeaser";

export function Home() {
  return (
    <>
      <SplitHero />
      <AboutSection />
      <AgencyTeaser />
      <PodcastTeaser />
    </>
  );
}
