import { ApplicationChart } from "@/components/recruiter/application-chart";
import RecruiterOverview from "@/components/recruiter/recruiter-overview";
import { StatsCard } from "@/components/shared/stats-card";
import { Briefcase, DollarSign, Users } from "lucide-react";

const stats = [
  {
    title: "Total Job Post",
    value: "40,689",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Briefcase,
  },
  {
    title: "Total Applicant",
    value: "3,689 ",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Users,
  },
  {
    title: "Money Spend",
    value: "14,154",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: DollarSign,
  },
];

export default function page() {
  return (
    <div>
      <div className=" mb-8">
        <h2 className="text-2xl font-semibold">Good morning, Maria</h2>
        <p className="">
          Here is your job listings statistic report from July 19 - July 25.
        </p>
      </div>

      <StatsCard stats={stats} />
      
    </div>
  );
}
