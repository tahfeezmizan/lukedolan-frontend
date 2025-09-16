import { JobPostTable } from "@/components/recruiter/job-post-table";
import Link from "next/link";

export default function JobPostPage() {
  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Job Posts</h2>
        <div className="">
          <Link
            href={"/recruiter/job-post/post-job"}
            className="bg-green-900 hover:bg-green-800 text-white px-8 py-2 text-lg font-medium rounded-lg"
          >
            Post Job
          </Link>
        </div>
      </div>
      <JobPostTable />
    </div>
  );
}
