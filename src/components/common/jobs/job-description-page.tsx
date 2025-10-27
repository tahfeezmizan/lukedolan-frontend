"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies"; // lightweight cookie parser
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import { useGetSingleJobQuery } from "@/redux/features/jobsApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import JobDetail from "./job-details";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "@/lib/loading-spinner";

type TokenPayload = {
  role?: string;
};

export default function JobDescriptionPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: job, isLoading } = useGetSingleJobQuery({ id });

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token || cookies.user;

    if (!token) {
      // Save the current URL before redirecting to login
      const currentPath = window.location.pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.role !== "applicant") {
        const currentPath = window.location.pathname;
        router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    } catch {
      const currentPath = window.location.pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [router]);

  // console.log( data?.user?.profile;)
  console.log(job?.user?.profile);

  return (
    <div className="bg-[#EBF1FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <div className="col-span-2">
              <JobDetail data={job} />
            </div>
            <div className="col-span-1 space-y-6 ">
              <aside className="w-full bg-white p-6 rounded-lg">
                <div className="space-y-8">
                  {/* About this role */}
                  <section>
                    <div className="mb-5">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {job?.title}
                      </h2>
                      <p className="font-medium text-gray-500">
                        <span> {job?.user?.profile?.companyName}</span>
                        {"  • "}
                        {job?.user?.profile?.location}
                      </p>
                    </div>
                    {/* <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {job?.applicationsCount} applied of {capacity} capacity
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div> */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Apply Before</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(job?.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Posted On</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(job?.startDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Type</span>
                        <span className="font-medium text-gray-900">
                          {job?.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-medium text-gray-900">
                          ${job?.minSalary} - ${job?.maxSalary} USD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applied</span>
                        <span className="font-medium text-gray-900">
                          {job?.applicationsCount}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Categories */}
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Categories
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"`}
                      >
                        {job?.category}
                      </span>
                    </div>
                  </section>

                  {/* Required Skills */}
                  {/* <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-50 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section> */}
                </div>
              </aside>

              <div>
                <Link href={`/job/${job?.title}/${job?._id}`}>
                  <Button className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
