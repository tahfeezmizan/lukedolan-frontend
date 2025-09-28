"use client";

import { Column, UserData, StatItem } from "@/types/types";
import { Calendar, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import AdminTable from "./table";
import { useGetAllUserQuery } from "@/redux/features/userApi";
import { useState, useMemo } from "react";

const columns: Column<UserData>[] = [
    { key: "_id", label: "User Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "companyName", label: "Company" },
    { key: "createdAt", label: "Joined At" },
];

export default function User() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useGetAllUserQuery({ page, limit });

    const users = data?.data?.users || [];
    const meta = data?.data?.meta;
    const staticData = data?.data?.staticData;

    // Generate stats dynamically
    const stats: StatItem[] = useMemo(() => {
        return [
            {
                title: "Total Users",
                value: staticData?.totalUsers?.toLocaleString() || "0",
                icon: Calendar,
            },
            {
                title: "Job Seekers",
                value: staticData?.totalApplicants?.toLocaleString() || "0",
                icon: Users,
            },
            {
                title: "Total Recruiters",
                value: staticData?.totalRecruiters?.toLocaleString() || "0",
                icon: Calendar,
            },
        ];
    }, [staticData]);

    return (
        <div>
            <StatsCard stats={stats} />

            {isLoading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : (
                <AdminTable
                    data={users}
                    columns={columns}
                    pagination={{
                        page: meta?.page || 1,
                        totalPages: meta?.totalPage || 1,
                        onPageChange: setPage,
                    }}
                />
            )}
        </div>
    );
}
