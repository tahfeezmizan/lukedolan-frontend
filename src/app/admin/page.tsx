import { ApplicationChart } from "@/components/recruiter/application-chart";
import RecruiterOverview from "@/components/recruiter/recruiter-overview";

export default function page() {
  return (
    <div>
      <RecruiterOverview />
      <ApplicationChart />
    </div>
  );
}
