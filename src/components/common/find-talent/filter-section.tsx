"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { TalentSidebar } from "./talent-sidebar";

import person from "@/assets/telent-person.png";
import TalentCards from "@/components/shared/talent-cards";
import { useGetAllTalentQuery } from "@/redux/features/userApi";
import { Talent } from "@/types/talentTypes";

export default function FilterSection() {
  const { data: talent,  } = useGetAllTalentQuery("");
  const talents = [
    {
      id: 1,
      name: "Sophia R.",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
    {
      id: 2,
      name: "John Doe",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
    {
      id: 3,
      name: "Sophia R.",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
    {
      id: 4,
      name: "Sophia R.",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const totalPages = Math.ceil(talents.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  // const currentTalents = talents.slice(startIndex, endIndex);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <TalentSidebar />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {talent?.map((talent: Talent) => (
              <TalentCards key={talent._id} talent={talent} />
            ))}
          </div>

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
