"use client";

import { ArrowRight, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import jobImg1 from "../../../../public/job-img (1).png";
import jobImg2 from "../../../../public/job-img (2).png";
import jobImg3 from "../../../../public/job-img (3).png";
import JobCard from "./job-card";

const jobs = [
  {
    id: 1,
    companyLogo: jobImg3,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
  },
  {
    id: 2,
    companyLogo: jobImg3,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
  },
  {
    id: 3,
    companyLogo: jobImg3,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
  },
  {
    id: 4,
    companyLogo: jobImg3,
    experienceLevel: "Beginner",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
  },
  {
    id: 5,
    companyLogo: jobImg3,
    experienceLevel: "Experienced",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
  },
  {
    id: 6,
    companyLogo: jobImg3,
    experienceLevel: "Freshers",
    daysLeft: "30 days to go",
    companyName: "Hair & Care Saloon",
    jobTitle: "Senior Hair Stylist",
    buttonText: "View Details",
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
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
