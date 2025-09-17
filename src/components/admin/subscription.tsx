import { AlertTriangle, Calendar, CheckCircle, Users } from "lucide-react";
import { PricingCard } from "../common/pricing/pricing-card";
import User from "./user";
import { StatsCard } from "../shared/stats-card";

const stats = [
  {
    title: "Expired",
    value: "40,689",
    icon: Users,
  },
  {
    title: "Active",
    value: "3,689 ",
    icon: CheckCircle,
  },
  {
    title: "Failed Subscriptions",
    value: "14,154",
    icon: AlertTriangle,
  },
];
const pricingPlans = [
  {
    title: "Starter",
    price: "(Free)",
    features: ["1 Free Job Post / Month", "Basic Job Filters"],
    isPopular: false,
  },
  {
    title: "Pro",
    price: "£ 10 / Monthly",
    features: [
      "Unlimited Job Posts",
      "Freelance, Part-Time, Apprenticeship & Guest Spot Options",
      "Candidate Applications Direct to Your Inbox",
    ],
    isPopular: true,
  },
  {
    title: "Business",
    price: "£ 99 / Yearly",
    features: [
      "Unlimited Job Posts",
      "Priority Placement in Search Results",
      "Monthly Insights on Your Job Reach",
    ],
    isPopular: false,
  },
];

export default function Subscription() {
  return (
    <div>
      <StatsCard stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            isPopular={plan.isPopular}
          />
        ))}
      </div>
    </div>
  );
}
