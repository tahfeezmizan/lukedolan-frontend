"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppliedJob } from "@/types/types";
import { X } from "lucide-react";

export default function Table({ appliedJobs }: { appliedJobs: AppliedJob[] }) {
  const [selectedJob, setSelectedJob] = useState<AppliedJob | null>(null);

  return (
    <>
      <tbody>
        {appliedJobs.map((jobs) => (
          <tr
            key={jobs._id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="py-4 px-6">
              <p>
                <p className="font-medium text-gray-900">{jobs.title}</p>
              </p>
            </td>
            <td className="py-4 px-6 text-gray-700">
              {jobs?.author?.companyName}
            </td>
            <td className="py-4 px-6 text-gray-700">{jobs.location}</td>
            <td className="py-4 px-6 text-gray-700">
              {new Date(jobs.createdAt).toLocaleString()}
            </td>

            <td className="py-4 px-6">
              <Button
                onClick={() => setSelectedJob(jobs)}
                className="bg-green-50 text-green-900 hover:bg-green-900 hover:text-white duration-300 font-semibold cursor-pointer"
              >
                View Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

      {/* Modal */}
      {selectedJob && (
        <p className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <p className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
            >
              <X />
            </button>

            {/* Job Header */}
            <p className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedJob.title}
              </h2>
              <p className="text-gray-600">
                {selectedJob?.author?.companyName}
              </p>
              <p className="text-sm text-gray-500">
                Posted on {new Date(selectedJob.createdAt).toLocaleDateString()}
              </p>
            </p>

            {/* Job Info Grid */}
            <p className="grid grid-cols-2 gap-6">
              <p>
                <p className="font-semibold text-gray-800">Name</p>
                <p className="text-gray-600">{selectedJob.name}</p>
              </p>

              <p>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">{selectedJob.email}</p>
              </p>

              <p>
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600">{selectedJob.phone}</p>
              </p>

              <p>
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600">{selectedJob.location}</p>
              </p>

              <p>
                <p className="font-semibold text-gray-800">Experience</p>
                <p className="text-gray-600">{selectedJob.experience} years</p>
              </p>

              <p>
                <p className="font-semibold text-gray-800">Resume</p>
                <a
                  href={selectedJob.resume}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </p>
            </p>
          </p>
        </p>
      )}
    </>
  );
}
