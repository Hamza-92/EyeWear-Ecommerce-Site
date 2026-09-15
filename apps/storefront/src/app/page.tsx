import { HomeHero } from "@/components/home/home-hero";
import { HomepageScrollReveal } from "@/components/home/homepage-scroll-reveal";
import { NewAndConsidered } from "@/components/home/new-and-considered";
import { ShopByIntent } from "@/components/home/shop-by-intent";
import { homeHeroContent, newAndConsideredContent, shopByIntentContent } from "@/config/homepage";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HomepageScrollReveal />
      <HomeHero content={homeHeroContent} />
      <NewAndConsidered content={newAndConsideredContent} />
      <ShopByIntent content={shopByIntentContent} />
    </main>
  );
}
