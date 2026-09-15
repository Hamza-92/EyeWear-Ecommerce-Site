import { HomeHero } from "@/components/home/home-hero";
import { homeHeroContent } from "@/config/homepage";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HomeHero content={homeHeroContent} />
    </main>
  );
}
