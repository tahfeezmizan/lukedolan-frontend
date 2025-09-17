"use client";

import { Calendar, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import UserTable from "./user-table";

const stats = [
  {
    title: "Total User",
    value: "40,689",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Calendar,
  },
  {
    title: "Job Seekers",
    value: "3,689 ",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Users,
  },
  {
    title: "Total Recruiter",
    value: "14,154",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Calendar,
  },
];

export default function User() {
  return (
    <div>
      <StatsCard stats={stats} />

      <UserTable />
    </div>
  );
}
