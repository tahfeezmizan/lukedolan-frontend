"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import { useGetApplicationQuery } from "@/redux/features/application";
import { AppliedJob } from "@/types/types";
import Link from "next/link";

export function ApplicationsList() {
  const { data: appliedUser } = useGetApplicationQuery("");
  console.log("people apply ", appliedUser);

  return (
    <div className="">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Applications</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Phone
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Application Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appliedUser?.map((job: AppliedJob) => (
                <tr
                  key={job?._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{job?.name}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{job?.email}</td>
                  <td className="py-4 px-6 text-gray-700">{job?.phone}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {formatDate(job?.createdAt)}
                  </td>

                  <td className="py-4 px-6">
                    <Link href={`/recruiter/applications`} target="_blank">
                      <Button className="bg-green-50 text-green-900 hover:bg-green-900 hover:text-white duration-300 font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
