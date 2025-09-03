// components/JobCard.tsx
import { CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, CirclePoundSterling, Navigation } from "lucide-react";
import Link from "next/link";

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
};

export default function JobCard({
  title,
  company,
  location,
  type,
  salary,
  posted,
}: JobCardProps) {
  return (
    <div className="w-full bg-white hover:shadow-md transition rounded-lg">
      <CardContent className="flex flex-col lg:flex-row justify-between items-start sm:items-center gap-6 md:gap-4 p-5">
        {/* Left Info */}
        <div>
          <h3 className="text-xl font-semibold leading-loose">{title}</h3>
          <p className="text-gray-800 font-normal">Company: {company}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-md text-gray-700">
            <span className="flex items-center gap-1">
              <Navigation size={16} className="text-green-950 " /> {location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} className="text-green-950 " /> {type}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-green-950 " /> {posted}
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-row-reverse lg:flex-col justify-between lg:justify-between sm:items-end gap-3 md:gap-5">
          <Link
            href={"job/1"}
            className="bg-green-900 hover:bg-green-800 text-white px-2 py-1 text-base font-medium rounded-none"
          >
            Apply Now
          </Link>
          <div className="flex items-center justify-between gap-2">
            <CirclePoundSterling size={20} className="bg-green-900 text-white rounded-full"  />
            <p className="font-medium text-gray-700">{salary}</p>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
