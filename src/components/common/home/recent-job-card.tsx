"use client";

import { JobCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function RecentJobCard({ job }: { job: JobCardProps }) {
  const { id, companyLogo, experienceLevel, daysLeft, companyName, jobTitle } =
    job;

  console.log(id);

  return (
    <div key={id} className="overflow-hidden bg-white rounded-2xl p-5">
      <div className="flex justify-between items-start mb-8">
        <Image
          src={companyLogo}
          alt={jobTitle}
          width={80}
          height={80}
          className="w-20 h-20 border p-2 rounded"
        />
        <div className="space-y-1">
          <h3 className="font-bold">{experienceLevel}</h3>
          <p className="text-gray-500">{daysLeft}</p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-400">
              {companyName}
            </h3>
            <p>{jobTitle}</p>
          </div>
          <Link
            href={`/job/${id}`}
            className="bg-green-900 hover:bg-green-800 text-white px-1.5 py-0.5 text-base rounded-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
