"use client";

import { Briefcase, DollarSign, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import { ApplicationChart } from "./application-chart";
import { useGetRecruiterStatisticsQuery } from "@/redux/features/recruterStaticsApi";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetMeQuery } from "@/redux/features/userApi";

export default function RecruiterOverview() {
  const { data, isLoading, error } = useGetRecruiterStatisticsQuery();
  const { data: userData } = useGetMeQuery("");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load recruiter statistics</p>;
  }

  const recruiterStats = data?.data;

  const stats = [
    {
      title: "Total Job Post",
      value: recruiterStats?.totalJobs.toString() ?? "0",
      change: "+0%", // you can calculate % change later if API supports
      changeText: "Compared to last week",
      icon: Briefcase,
    },
    {
      title: "Total Applicant",
      value: recruiterStats?.totalApplications.toString() ?? "0",
      change: "+0%",
      changeText: "Compared to last week",
      icon: Users,
    },
    {
      title: "Total Chats",
      value: recruiterStats?.totalChats.toString() ?? "0",
      change: "+0%",
      changeText: "Compared to last week",
      icon: DollarSign, // you could swap this for a chat icon if you prefer
    },
  ];

  console.log("RECRUITER STATS", userData);

  return (
    <div>
      <div className="flex justify-between items-end mb-8 ">
        <div className=" space-y-1">
          <h2 className="text-2xl font-semibold">Welcome back, {userData?.name}</h2>
          <p>Here is your job listings statistic report.</p>
        </div>
        <div className="w-full max-w-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">
              Complete your profile
            </span>
            <span className="font-semibold">
              {userData?.profileCompletion ?? 0}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-green-800 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${userData?.profileCompletion ?? 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <StatsCard stats={stats} />

      <ApplicationChart />
    </div>
  );
}
