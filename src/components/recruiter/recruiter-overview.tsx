"use client";

import { Briefcase, DollarSign, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import { ApplicationChart } from "./application-chart";
import { useGetRecruiterStatisticsQuery } from "@/redux/features/recruterStaticsApi";

export default function RecruiterOverview() {
    const { data, isLoading, error } = useGetRecruiterStatisticsQuery();

    if (isLoading) {
        return <p>Loading statistics...</p>;
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

    return (
        <div>
            <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-semibold">Welcome back, Luck</h2>
                <p>Here is your job listings statistic report.</p>
            </div>

            <StatsCard stats={stats} />

            <ApplicationChart />
        </div>
    );
}
