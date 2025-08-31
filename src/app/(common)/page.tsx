import { CtaSection } from "@/components/shared/pages/cta-section";
import { DiscoverSection } from "@/components/home/discover-section";
import { HeroSection } from "@/components/home/hero-section";
import { OpportunitiesSection } from "@/components/home/opportunities-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyRoqitSection } from "@/components/home/why-roqit-section";
import React from "react";
import { NewsletterSection } from "@/components/shared/pages/newsletter-section";

export default function page() {
  return (
    <div>
      <HeroSection />
      <DiscoverSection />
      <WhyRoqitSection />
      <OpportunitiesSection />
      <CtaSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
