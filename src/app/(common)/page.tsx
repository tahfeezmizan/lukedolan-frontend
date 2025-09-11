import { DiscoverSection } from "@/components/common/home/discover-section";
import { HeroSection } from "@/components/common/home/hero-section";
import HiringHero from "@/components/common/home/hiring-hero";
import { RecentJob } from "@/components/common/home/recent-job";
import { TalentSection } from "@/components/common/home/talent-section";
import { WhyRoqitSection } from "@/components/common/home/why-roqit-section";
import { NewsletterSection } from "@/components/shared/pages/newsletter-section";

export default function page() {
  return (
    <div>
      <HeroSection />
      <DiscoverSection />
      <WhyRoqitSection />
      <RecentJob />
      <HiringHero />
      <TalentSection />
      <NewsletterSection />
    </div>
  );
}
