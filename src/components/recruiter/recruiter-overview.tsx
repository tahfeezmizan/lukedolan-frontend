import { Briefcase, DollarSign, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";

const stats = [
  {
    title: "Total Job Post",
    value: "124",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Briefcase,
  },
  {
    title: "Total Applicant",
    value: "124",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Users,
  },
  {
    title: "Money Spend",
    value: "124",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: DollarSign,
  },
];

export default function RecruiterOverview() {
  return (
    <div>
      <div className=" mb-8 space-y-1">
        <h2 className="text-2xl font-semibold">Welcome back, Luck</h2>
        <p className="">
          Here is your job listings statistic report from July 19 - July 25.
        </p>
      </div>

      <StatsCard stats={stats} />
      {/* <RecruiterStats /> */}
    </div>
  );
}
