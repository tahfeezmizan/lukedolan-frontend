"use client";

import { useState } from "react";
import JobCard from "./job-card";
import { SidebarFilter } from "./sidebar-filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import SVGImage from "@/assets/rocket.png";
import companyLogo from "@/assets/company-logo (1).png";
import companyLogo2 from "@/assets/company-logo (2).png";
import companyLogo3 from "@/assets/company-logo (3).png";
import companyLogo4 from "@/assets/company-logo (4).png";
import companyLogo5 from "@/assets/company-logo (5).png";

export default function JobsSection() {
  const allJobs = [
    {
      id: 1,
      companyLogo: companyLogo,
      experienceLevel: "Experienced",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "London, UK"
    },
    {
      id: 2,
      companyLogo: companyLogo2,
      experienceLevel: "Experienced",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "string"
    },
    {
      id: 3,
      companyLogo: companyLogo3,
      experienceLevel: "Experienced",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "string"
    },
    {
      id: 4,
      companyLogo: companyLogo4,
      experienceLevel: "Beginner",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "string"
    },
    {
      id: 5,
      companyLogo: companyLogo5,
      experienceLevel: "Experienced",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "string"
    },
    {
      id: 6,
      companyLogo: companyLogo,
      experienceLevel: "Freshers",
      daysLeft: "30 days to go",
      companyName: "Hair & Care Saloon",
      jobTitle: "Senior Hair Stylist",
      salary: "40,000 – 50,000",
      location: "string"
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = allJobs.slice(startIndex, endIndex);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden">
      <div className="text-center mb-10 space-y-2">
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
          {currentJobs.map((job, index) => (
            <JobCard key={startIndex + index} {...job} />
          ))}

          {totalPages > 1 && (
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
          )}
        </div>
      </div>
    </section>
  );
}
