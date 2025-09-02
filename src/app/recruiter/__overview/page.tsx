import { ApplicationChart } from "@/components/recruiter/application-chart";
import RecruiterOverview from "@/components/recruiter/recruiter-overview";
import React from "react";

export default function page() {
  return (
    <div>
      <RecruiterOverview />
      <ApplicationChart />
    </div>
  );
}
