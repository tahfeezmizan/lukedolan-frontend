"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import companyLogo from "@/assets/company-logo (1).png";
import companyLogo2 from "@/assets/company-logo (2).png";
import companyLogo3 from "@/assets/company-logo (3).png";
import companyLogo4 from "@/assets/company-logo (4).png";
import companyLogo5 from "@/assets/company-logo (5).png";
import RecentJobCard from "./recent-job-card";

const jobs = [
  {
    id: 1,
    companyLogo: companyLogo,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "London, UK",
  },
  {
    id: 2,
    companyLogo: companyLogo2,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "string",
  },
  {
    id: 3,
    companyLogo: companyLogo3,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "string",
  },
  {
    id: 4,
    companyLogo: companyLogo4,
    experienceLevel: "Beginner",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "string",
  },
  {
    id: 5,
    companyLogo: companyLogo5,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "string",
  },
  {
    id: 6,
    companyLogo: companyLogo,
    experienceLevel: "Freshers",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    salary: "40,000 – 50,000",
    location: "string",
  },
];

export function RecentJob() {
  return (
    <section className="bg-[#EBF1FA] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold ">
            Recent Job Circular
          </h2>
          <Link
            href={"/job"}
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-none duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <RecentJobCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
