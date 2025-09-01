import JobsHero from "@/components/common/jobs/jobs-hero";
import JobsSection from "@/components/common/jobs/jobs-section";
import { CtaSection } from "@/components/shared/pages/cta-section";
import React from "react";

export default function page() {
  return (
    <div>
      <JobsHero />
      <JobsSection />
      <CtaSection />
    </div>
  );
}
