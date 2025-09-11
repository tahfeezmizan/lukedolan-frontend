"use client";

import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }: any) {
  return (
    <div key={job.id} className="overflow-hidden bg-white rounded-2xl p-5">
      <div className="flex justify-between items-start mb-8">
        <Image
          src={job.companyLogo}
          alt={job.alt}
          width={80}
          height={80}
          className="w-20 h-20 border p-2 rounded"
        />
        <div className="space-y-1">
          <h3 className="font-bold">{job.experienceLevel}</h3>
          <p className="text-gray-500">{job.daysLeft}</p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-400">
              {job.companyName}
            </h3>
            <p>{job.jobTitle}</p>
          </div>
          <Link
            href={`/job/${job.id}`}
            className="bg-green-900 hover:bg-green-800 text-white px-1.5 py-0.5 text-base rounded-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
