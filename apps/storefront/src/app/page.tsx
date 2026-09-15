import { HomeHero } from "@/components/home/home-hero";
import { NewAndConsidered } from "@/components/home/new-and-considered";
import { homeHeroContent, newAndConsideredContent } from "@/config/homepage";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HomeHero content={homeHeroContent} />
      <NewAndConsidered content={newAndConsideredContent} />
    </main>
  );
}
