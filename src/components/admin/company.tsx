/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React from "react";
// import { StatsCard } from "../shared/stats-card";
// import { Calendar, Users } from "lucide-react";
// import { Column, CompanyData } from "@/types/types";
// import AdminTable from "./table";
// import { useGetAllUserQuery } from "@/redux/features/userApi";

// const stats = [
//     {
//         title: "Total User",
//         value: "40,689",
//         icon: Calendar,
//     },
//     {
//         title: "Job Seekers",
//         value: "3,689 ",
//         icon: Users,
//     },
//     {
//         title: "Total Recruiter",
//         value: "14,154",
//         icon: Calendar,
//     },
// ];

// const companyData: CompanyData[] = [
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 12,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 7,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 5,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 4,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
//     {
//         recruiterId: "RQ001",
//         recruiterName: "Sarah Johnson",
//         companyName: "Style & Cut Saloon",
//         jobPosted: 12,
//         renewalDate: "07/07/2025",
//         paymentStatus: "07/07/2025",
//     },
// ];

// const columns: Column<CompanyData>[] = [
//     { key: "recruiterId", label: "Recruiter ID" },
//     { key: "recruiterName", label: "Recruiter Name" },
//     { key: "companyName", label: "Company Name" },
//     { key: "jobPosted", label: "Job Posted" },
//     { key: "renewalDate", label: "Renewal Date" },
//     { key: "paymentStatus", label: "Payment Status" },
// ];

// export default function Company() {
//     const { data } = useGetAllUserQuery({});
//     console.log(data);

//     return (
//         <div>
//             <StatsCard stats={stats} />

//             <AdminTable data={companyData} columns={columns} />
//         </div>
//     );
// }

"use client";

import React, { useMemo, useState } from "react";
import { StatsCard } from "../shared/stats-card";
import { Calendar, Users } from "lucide-react";
import { Column } from "@/types/types";
import AdminTable from "./table";
import { useGetAllUserQuery } from "@/redux/features/userApi";

type UserRow = {
    serial: number;
    name: string;
    email: string;
    role: string;
    status: string;
    companyName: string | null;
    createdAt: string;
};

const columns: Column<UserRow>[] = [
    { key: "serial", label: "Serial No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "companyName", label: "Company" },
    { key: "createdAt", label: "Joined At" },
];

export default function Company() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useGetAllUserQuery({ page, limit, role: "recruiter" });

    const users: UserRow[] = useMemo(() => {
        if (!data?.data?.users) return [];
        return data.data.users.map((user: any, index: number) => ({
            serial: (page - 1) * limit + index + 1,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            companyName: user.profile?.companyName || null,
            createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));
    }, [data, page]);

    const stats = useMemo(
        () => [
            {
                title: "Total Users",
                value: data?.data?.staticData?.totalUsers?.toLocaleString() || "0",
                icon: Calendar,
            },
            {
                title: "Job Seekers",
                value: data?.data?.staticData?.totalApplicants?.toLocaleString() || "0",
                icon: Users,
            },
            {
                title: "Total Recruiters",
                value: data?.data?.staticData?.totalRecruiters?.toLocaleString() || "0",
                icon: Calendar,
            },
        ],
        [data]
    );

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
                        page: data?.data?.meta?.page || 1,
                        totalPages: data?.data?.meta?.totalPage || 1,
                        onPageChange: setPage,
                    }}
                />
            )}
        </div>
    );
}
