import React from "react";
import { StatsCard } from "../shared/stats-card";
import { Calendar, Users } from "lucide-react";
import { Column, CompanyData } from "@/types/types";
import AdminTable from "./table";

const stats = [
  {
    title: "Total User",
    value: "40,689",
    icon: Calendar,
  },
  {
    title: "Job Seekers",
    value: "3,689 ",
    icon: Users,
  },
  {
    title: "Total Recruiter",
    value: "14,154",
    icon: Calendar,
  },
];

const companyData: CompanyData[] = [
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 12,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 5,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 7,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 5,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 5,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 4,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
  {
    recruiterId: "RQ001",
    recruiterName: "Sarah Johnson",
    companyName: "Style & Cut Saloon",
    jobPosted: 12,
    renewalDate: "07/07/2025",
    paymentStatus: "07/07/2025",
  },
];

const columns: Column<CompanyData>[] = [
  { key: "recruiterId", label: "Recruiter ID" },
  { key: "recruiterName", label: "Recruiter Name" },
  { key: "companyName", label: "Company Name" },
  { key: "jobPosted", label: "Job Posted" },
  { key: "renewalDate", label: "Renewal Date" },
  { key: "paymentStatus", label: "Payment Status" },
];

export default function Company() {
  return (
    <div>
      <StatsCard stats={stats} />

      <AdminTable data={companyData} columns={columns} />
    </div>
  );
}
