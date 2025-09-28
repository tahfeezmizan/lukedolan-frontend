"use client";

import { StatsCard } from "@/components/shared/stats-card";
import FeaturePurchaseChart from "@/components/admin/feature-purchase-chart";
import RevenueChart from "@/components/admin/revenue-chart";
import { Briefcase, DollarSign, Users } from "lucide-react";
import { useGetStatisticsQuery } from "@/redux/features/adminStatics";

export default function DashboardPage() {
    const { data, isLoading } = useGetStatisticsQuery();

    if (isLoading) return <p className="text-gray-500">Loading dashboard...</p>;

    const stats = [
        {
            title: "Total Job Post",
            value: data?.data.jobs.totalJobs.toLocaleString() || "0",
            icon: Briefcase,
        },
        {
            title: "Total Applicant",
            value: data?.data.users.totalApplicants.toLocaleString() || "0",
            icon: Users,
        },
        {
            title: "Money Spend",
            value: `£${data?.data.subscriptions.totalRevenue.toLocaleString() || "0"}`,
            icon: DollarSign,
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Good morning, Maria</h2>
                <p>Here is your job listings statistic report from this month.</p>
            </div>

            <StatsCard stats={stats} />

            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="col-span-2">
                    <RevenueChart />
                </div>
                <div className="col-span-1">
                    <FeaturePurchaseChart />
                </div>
            </div>
        </div>
    );
}
