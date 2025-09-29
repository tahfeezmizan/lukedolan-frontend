"use client";

import TalentCards from "@/components/shared/talent-cards";
import { useGetAllTalentQuery } from "@/redux/features/userApi";
import { TalentProps } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TalentSection() {
 
  const { data: talent, isLoading } = useGetAllTalentQuery("");
  console.log("All Talent", talent);

  return (
    <section className="bg-[#EBF1FA] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold ">
            Top Talent Ready to Work
          </h2>
          <Link
            href={"/find-talent"}
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talent?.map((talent : TalentProps) => (
            <TalentCards key={talent._id} talent={talent} />
          ))}
        </div>
      </div>
    </section>
  );
}
