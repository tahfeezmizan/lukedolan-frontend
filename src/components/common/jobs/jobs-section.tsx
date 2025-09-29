/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SVGImage from "@/assets/rocket.png";
import { useGetFilterdJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import JobCard from "./job-card";
import { SidebarFilter, FilterData } from "./sidebar-filter";

export default function JobsSection() {
    const [filters, setFilters] = useState<FilterData>({
        search: "",
        location: "",
        category: "all-categories",
        jobType: {
            fullTime: false,
            partTime: false,
            contract: false,
            remote: false,
            freeLance: false,
        },
        salaryRange: [0, 100000],
    });

    const [currentPage, setCurrentPage] = useState(1);

    // Convert filter data to API parameters
    const apiFilters = useMemo(() => {
        const apiParams: any = {
            page: currentPage,
            limit: 3,
        };

        if (filters.search) apiParams.searchTerm = filters.search;
        if (filters.location) apiParams.jobLocation = filters.location;
        if (filters.category && filters.category !== "all-categories") {
            apiParams.category = filters.category;
        }

        // Handle job types - support multiple selection
        const selectedJobTypes = Object.entries(filters.jobType)
            .filter(([_, isSelected]) => isSelected)
            .map(([type]) => type);

        if (selectedJobTypes.length > 0) {
            const jobTypeMapping: Record<string, string> = {
                fullTime: "Full-time",
                partTime: "Part-time",
                contract: "Contract",
                remote: "Remote",
                freeLance: "Freelance",
            };

            const apiJobTypes = selectedJobTypes.map((type) => jobTypeMapping[type]);

            // If your API only supports single type, take the first one
            apiParams.type = apiJobTypes[0];
        }

        const [minSalary, maxSalary] = filters.salaryRange;
        if (minSalary > 0) apiParams.minSalary = minSalary;
        if (maxSalary < 100000) apiParams.maxSalary = maxSalary;

        return apiParams;
    }, [filters, currentPage]);

  const { data: jobsResponse, isLoading, error } = useGetFilterdJobsQuery(apiFilters);
  console.log(jobsResponse,"jobs")

    // Extract jobs and pagination data from response
    const { jobs, pagination } = useMemo(() => {
        if (!jobsResponse) {
            return { jobs: [], pagination: null };
        }

        if (Array.isArray(jobsResponse)) {
            return { jobs: jobsResponse, pagination: null };
        }

        return {
            jobs: jobsResponse.data || [],
            pagination: jobsResponse.meta || null,
        };
    }, [jobsResponse]);

    const handleFiltersChange = useCallback((newFilters: FilterData) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Generate page numbers for pagination
    const renderPageNumbers = () => {
        if (!pagination || pagination.totalPage <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(pagination.totalPage, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        pages.push(
            <button key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`}>
                Previous
            </button>
        );

        // First page
        if (startPage > 1) {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)} className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300">
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-2 py-1">
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`px-3 py-1 rounded-md ${currentPage === i ? "bg-green-600 text-white border border-green-600" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`}>
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < pagination.totalPage) {
            if (endPage < pagination.totalPage - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-2 py-1">
                        ...
                    </span>
                );
            }
            pages.push(
                <button key={pagination.totalPage} onClick={() => handlePageChange(pagination.totalPage)} className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300">
                    {pagination.totalPage}
                </button>
            );
        }

        // Next button
        pages.push(
            <button key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.totalPage} className={`px-3 py-1 rounded-md ${currentPage === pagination.totalPage ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`}>
                Next
            </button>
        );

        return pages;
    };

    if (error) {
        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden">
                <div className="text-center py-12">
                    <div className="text-red-500 text-lg mb-2">Error loading jobs</div>
                    <p className="text-gray-400">Please try again later</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden h-full min-h-screen">
            <div className="text-center mb-10 space-y-2 pt-5 lg:pt-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-center">
                    Find Your <span className="text-green-600">Styler</span>
                </h2>
                <div className="flex items-center justify-center gap-3">
                    <p className="text-[#515B6F] text-base">Find your next career at Roqit</p>
                    <Image src={SVGImage.src} alt="rocket image" width={42} height={42} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <SidebarFilter onFiltersChange={handleFiltersChange} />
                </div>

                <div className="col-span-1 md:col-span-2">
                  
                    {/* Jobs list */}
                    <div className="space-y-6 mb-8">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                            </div>
                        ) : jobs && jobs.length > 0 ? (
                            jobs.map((job: PostJobFormData) => <JobCard job={job} key={job._id} />)
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-500 text-lg mb-2">No jobs found matching your criteria</div>
                                <p className="text-gray-400">Try adjusting your filters or search terms</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPage > 1 && <div className="flex justify-center items-center space-x-2 mt-8">{renderPageNumbers()}</div>}
                </div>
            </div>
        </section>
    );
}
