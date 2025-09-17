"use client";

import { Column, UserData } from "@/types/types";
import { Calendar, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
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

const usersData = [
  {
    userId: "#J-10294",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Job Seeker",
    phone: "+1-202-555-0164",
    jobsApplied: 10,
  },
  {
    userId: "#J-10295",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Job Seeker",
    phone: "+1-202-555-0164",
    jobsApplied: 65,
  },
  {
    userId: "#J-10296",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Job Seeker",
    phone: "+1-202-555-0164",
    jobsApplied: 44,
  },
  {
    userId: "#J-10297",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Job Seeker",
    phone: "+1-202-555-0164",
    jobsApplied: 12,
  },
  {
    userId: "#J-10298",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 3,
  },
  {
    userId: "#J-10299",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 3,
  },
  {
    userId: "#J-10300",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 4,
  },
  {
    userId: "#J-10298",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 3,
  },
  {
    userId: "#J-10299",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 3,
  },
  {
    userId: "#J-10300",
    name: "John Carter",
    email: "example@gmail.com",
    role: "Recruiter",
    phone: "+1-202-555-0164",
    jobsApplied: 4,
  },
];

const columns: Column<UserData>[] = [
  { key: "userId", label: "User Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "phone", label: "Phone" },
  { key: "jobsApplied", label: "Jobs Applied" },
];

export default function User() {
  return (
    <div>
      <StatsCard stats={stats} />

      <AdminTable data={usersData} columns={columns} />
    </div>
  );
}
