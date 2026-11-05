import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/FindEvent";
import FindEventsNearYou from "@/components/home/FindEvent";

export default function HomePage() {
  return (
    <>
      <HeroSection />
       <FeaturesSection />
       <FeaturedEvents />
      <GallerySection />
      <FindEventsNearYou/>
    </>
  );
}
