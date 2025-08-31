"use client";

import { ArrowRight, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import jobImg1 from "../../../public/job-img (1).png";
import jobImg2 from "../../../public/job-img (2).png";
import jobImg3 from "../../../public/job-img (3).png";

const jobOpportunities = [
  {
    id: 1,
    title: "Senior Hair Stylist",
    location: "New York, NY",
    salary: "1000,00",
    image: jobImg1,
    alt: "Professional hair stylist working with client",
  },
  {
    id: 2,
    title: "Beauty Creatives",
    location: "New York, NY",
    salary: "1000,00",
    image: jobImg2,
    alt: "Creative makeup artist applying artistic makeup",
  },
  {
    id: 3,
    title: "Senior Hair Stylist",
    location: "New York, NY",
    salary: "1000,00",
    image: jobImg3,
    alt: "Professional barber cutting hair",
  },
];

export function OpportunitiesSection() {
  return (
    <section className="bg-[#EBF1FA] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Fresh Opportunities
          </h2>
          <Link
            href={"/"}
            className="bg-green-900 hover:bg-green-800 text-white px-8 py-2 text-lg font-medium rounded-none flex items-center justify-between gap-2"
          >
            Browse All Jobs
            <ArrowRight className="ml-2 w-4 h-4 " />
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpportunities.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl overflow-hidden ">
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={job.image}
                  alt={job.alt}
                  width={350}
                  height={210}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {job.title}
                  </h3>
                  <Link
                    href={"/"}
                    className="bg-green-900 hover:bg-green-800 text-white px-1 py-0.5 text-base rounded-none"
                  >
                    View Details
                  </Link>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{job.location}</span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
