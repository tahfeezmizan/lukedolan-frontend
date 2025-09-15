import JobDescription from "@/components/common/jobs/job-description";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const jobData = {
  appliedCount: 5,
  capacity: 10,
  applyBefore: "July 31, 2021",
  postedOn: "July 1, 2021",
  jobType: "Full-Time",
  salary: "$75k-$85k USD",
  categories: ["Marketing", "Design"],
  requiredSkills: [
    "Project Management",
    "Copywriting",
    "Social Media Marketing",
    "English",
    "Copy Editing",
  ],
};

export default function page() {
  const {
    appliedCount,
    capacity,
    applyBefore,
    postedOn,
    jobType,
    salary,
    categories,
    requiredSkills,
  } = jobData;

  const progressPercentage = (appliedCount / capacity) * 100;
  return (
    <div className="bg-[#EBF1FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ">
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="col-span-2">
            <JobDescription />
          </div>
          <div className="col-span-1 space-y-6 ">
            <aside className="w-full bg-white p-6 rounded-lg">
              <div className="space-y-8">
                {/* About this role */}
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    About this role
                  </h2>

                  {/* Application Progress */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {appliedCount} applied of {capacity} capacity
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apply Before</span>
                      <span className="font-medium text-gray-900">
                        {applyBefore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Posted On</span>
                      <span className="font-medium text-gray-900">
                        {postedOn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Type</span>
                      <span className="font-medium text-gray-900">
                        {jobType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary</span>
                      <span className="font-medium text-gray-900">
                        {salary}
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
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          category === "Marketing"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Required Skills */}
                <section>
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
                </section>
              </div>
            </aside>

            <div className="">
              <Link href={"/job/1/1"}>
                <Button className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
