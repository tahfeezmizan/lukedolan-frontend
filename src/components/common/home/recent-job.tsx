"use client";

import { useGetAllJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RecentJobCard from "./recent-job-card";

// const jobs = [
//   {
//     id: 1,
//     companyLogo: companyLogo,
//     experienceLevel: "Experienced",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "London, UK",
//   },
//   {
//     id: 2,
//     companyLogo: companyLogo2,
//     experienceLevel: "Experienced",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "string",
//   },
//   {
//     id: 3,
//     companyLogo: companyLogo3,
//     experienceLevel: "Experienced",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "string",
//   },
//   {
//     id: 4,
//     companyLogo: companyLogo4,
//     experienceLevel: "Beginner",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "string",
//   },
//   {
//     id: 5,
//     companyLogo: companyLogo5,
//     experienceLevel: "Experienced",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "string",
//   },
//   {
//     id: 6,
//     companyLogo: companyLogo,
//     experienceLevel: "Freshers",
//     daysLeft: "30 days to go",
//     companyName: "Hair & Care Saloon",
//     jobTitle: "Senior Hair Stylist",
//     salary: "40,000 – 50,000",
//     location: "string",
//   },
// ];

export function RecentJob() {
  const { data: jobs } = useGetAllJobsQuery(undefined);

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
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs?.slice(0, 6)?.map((job: PostJobFormData) => (
            <RecentJobCard job={job} key={job._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
