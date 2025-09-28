"use client";

import SVGImage from "@/assets/rocket.png";
import { useGetAllJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import Image from "next/image";
import JobCard from "./job-card";
import { SidebarFilter } from "./sidebar-filter";

export default function JobsSection() {
  const { data: jobs, isLoading } = useGetAllJobsQuery(undefined);
  console.log(jobs,'allJobs');
  // const [currentPage, setCurrentPage] = useState(1);
  // const jobsPerPage = 4;
  // const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // const startIndex = (currentPage - 1) * jobsPerPage;
  // const endIndex = startIndex + jobsPerPage;
  // const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden">
      <div className="text-center mb-10 space-y-2 pt-5 lg:pt-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">
          Find Your <span className="text-green-600">Styler</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <p className="text-[#515B6F] text-base">
            Find your next career at Roqit
          </p>
          <Image src={SVGImage.src} alt="rockte image" width={42} height={42} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <SidebarFilter />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          {jobs?.slice(0, 6)?.map((job: PostJobFormData) => (
            <JobCard job={job} key={job._id} />
          ))}

          {/* {totalPages > 1 && (
            <div className="flex justify-between mt-8">
              <Pagination className="!justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}
