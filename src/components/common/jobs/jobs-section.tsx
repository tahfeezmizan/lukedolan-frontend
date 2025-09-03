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
import SVGImage from '../../../../public/rocket.png'


export default function JobsSection() {
  const allJobs = [
    {
      title: "Senior Hair Stylist",
      company: "Nova Hair Solutions",
      location: "London, UK",
      type: "Full-time",
      salary: "£40,000 – £50,000 / year",
      posted: "2 days ago",
    },
    {
      title: "Junior Hair Stylist",
      company: "Glow Salon",
      location: "Manchester, UK",
      type: "Part-time",
      salary: "£25,000 – £30,000 / year",
      posted: "1 week ago",
    },
    {
      title: "Makeup Artist",
      company: "Beauty Studio Pro",
      location: "Birmingham, UK",
      type: "Full-time",
      salary: "£30,000 – £35,000 / year",
      posted: "3 days ago",
    },
    {
      title: "Nail Technician",
      company: "Luxury Nails",
      location: "London, UK",
      type: "Part-time",
      salary: "£22,000 – £28,000 / year",
      posted: "5 days ago",
    },
    {
      title: "Barber",
      company: "Classic Cuts",
      location: "Leeds, UK",
      type: "Full-time",
      salary: "£28,000 – £35,000 / year",
      posted: "1 day ago",
    },
    {
      title: "Beauty Therapist",
      company: "Spa Retreat",
      location: "Manchester, UK",
      type: "Full-time",
      salary: "£26,000 – £32,000 / year",
      posted: "4 days ago",
    },
    {
      title: "Hair Colorist",
      company: "Color Me Beautiful",
      location: "London, UK",
      type: "Full-time",
      salary: "£35,000 – £42,000 / year",
      posted: "6 days ago",
    },
    {
      title: "Eyebrow Specialist",
      company: "Brow Bar",
      location: "Bristol, UK",
      type: "Part-time",
      salary: "£20,000 – £25,000 / year",
      posted: "2 weeks ago",
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
