import { CtaSection } from "@/components/shared/pages/cta-section";
import { DiscoverSection } from "@/components/common/home/discover-section";
import { HeroSection } from "@/components/common/home/hero-section";
import { RecentJob } from "@/components/common/home/recent-job";
import { TestimonialsSection } from "@/components/common/home/testimonials-section";
import { WhyRoqitSection } from "@/components/common/home/why-roqit-section";
import React from "react";
import { NewsletterSection } from "@/components/shared/pages/newsletter-section";

export default function page() {
  return (
    <div>
      <HeroSection />
      <DiscoverSection />
      <WhyRoqitSection />
      <RecentJob />
      <CtaSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
