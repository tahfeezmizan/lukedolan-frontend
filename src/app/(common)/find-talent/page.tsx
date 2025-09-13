import FilterSection from "@/components/common/find-talent/filter-section";
import FindTalentHero from "@/components/common/find-talent/find-talent-hero";
import React from "react";

export default function page() {
  return (
    <div className="bg-[#EBF1FA]">
      <FindTalentHero />
      <FilterSection />
    </div>
  );
}
