"use client"
import Table from "@/components/shared/table";
import { useGetAppliedJobsQuery } from "@/redux/features/applicationApi";



export default  function page() {

  const { data: appliedJobsData } =  useGetAppliedJobsQuery();

  console.log(appliedJobsData)

  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

      <table className="w-full bg-white">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Job Title
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Company / Recruiter
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Location
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Applied Date
            </th>
          
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <Table appliedJobs={appliedJobsData || []} />
      </table>
    </div>
  );
}
