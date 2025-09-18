import { Column, JobData } from "@/types/types";
import { Calendar, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import AdminTable from "./table";

const stats = [
  {
    title: "Total Job Posted",
    value: "40,689",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Calendar,
  },
  {
    title: "Active Jobs",
    value: "3,689 ",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Users,
  },
  {
    title: "Application",
    value: "14,154",
    change: "+8.5%",
    changeText: "Up from yesterday",
    icon: Calendar,
  },
];

const jobData: JobData[] = [
  {
    userId: "#J-10294",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 55,
  },
  {
    userId: "#J-10295",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 55,
  },
  {
    userId: "#J-10296",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 44,
  },
  {
    userId: "#J-10297",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 12,
  },
  {
    userId: "#J-10298",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 3,
  },
  {
    userId: "#J-10299",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 3,
  },
  {
    userId: "#J-10300",
    jobTitle: "Senior Hair Stylist",
    companyName: "Style & cut Saloon",
    salary: "£2,200/mo",
    jobType: "Full time",
    applications: 4,
  },
];

const columns: Column<JobData>[] = [
  { key: "userId", label: "Job Id" },
  { key: "jobTitle", label: "Job Title" },
  { key: "companyName", label: "Company Name" },
  { key: "salary", label: "Salary" },
  { key: "jobType", label: "Job Type" },
  { key: "applications", label: "Applications" },
];

export default function Jobs() {
  return (
    <div>
      <StatsCard stats={stats} />

      <AdminTable data={jobData} columns={columns} />
    </div>
  );
}
