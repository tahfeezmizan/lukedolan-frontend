import { DiscoverSection } from "@/components/home/discover-section";
import { HeroSection } from "@/components/home/hero-section";
import { OpportunitiesSection } from "@/components/home/opportunities-section";
import { WhyRoqitSection } from "@/components/home/why-roqit-section";
import React from "react";

export default function page() {
  return (
    <div>
      <HeroSection />
      <DiscoverSection />
      <WhyRoqitSection />
      <OpportunitiesSection />
    </div>
  );
}
