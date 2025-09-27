"use client";

import companyLogo from "@/assets/company-logo (1).png";
import TimeAgo from "@/lib/time-ago";
import { PostJobFormData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function RecentJobCard({ job }: { job: PostJobFormData }) {
  const {
    _id,
    title,
    applicationsCount,
    endDate,
    jobLocation,
    maxSalary,
    minSalary,
    startDate,
    type,
    experianceLabel,
    user: { profile: { companyName } = {} } = {},
  } = job;

  console.log(endDate);

  return (
    <div key={_id} className="rounded-lg overflow-hidden bg-white  p-5">
      <div className="flex justify-between items-start mb-8">
        <Image
          src={companyLogo}
          alt={title}
          width={80}
          height={80}
          className="w-20 h-20 border p-2 rounded"
        />
        <div className="space-y-1">
          {/* experienceLevel */}
          <h3 className="font-bold">{experianceLabel || "Experienced"}</h3>
          {/* daysLeft */}
          <p className="text-gray-500">
            <TimeAgo date={endDate} />
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-none group-hover:text-white transition-colors duration-400">
              {title}
            </h3>
            <p>{companyName || "Company"}</p>
          </div>
          <Link
            href={`/job/${_id}`}
            className="bg-green-900 text-white px-2 py-1 text-sm rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
