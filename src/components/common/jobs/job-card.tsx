// components/JobCard.tsx
import companyLogo from "@/assets/company-logo (1).png";
import { CardContent } from "@/components/ui/card";
import TimeAgo from "@/lib/time-ago";
import { PostJobFormData } from "@/types/types";
import { Briefcase, Calendar, CirclePoundSterling, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }: { job: PostJobFormData }) {
  const {
    _id,
    title,
    jobLocation,
    maxSalary,
    minSalary,
    startDate,
    type,
    user,
  } = job;

  const { companyName } = user?.profile || {};

  return (
    <div className="w-full bg-white hover:shadow-md transition rounded-lg">
      <CardContent className="flex flex-col lg:flex-row justify-between items-start gap-6 md:gap-4 p-5">
        {/* Left Info */}
        <div>
          <Image
            src={companyLogo}
            alt={"image"}
            width={80}
            height={80}
            className="w-20 h-20b object-contain border p-2 rounded mb-2"
          />
          <h3 className="text-xl font-semibold leading-loose">{title}</h3>
          <p className="text-gray-800">
            Company:{" "}
            <span className="font-semibold">{companyName || "No compnay"}</span>
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-md text-black">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-green-950 " /> {jobLocation}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-green-950 " />
              {type}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-green-950 " />
              <TimeAgo date={startDate} />
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-row-reverse lg:flex-col justify-between lg:justify-between sm:items-end gap-3 md:gap-5">
          <Link
            href={`job/${_id}`}
            className="bg-green-900 hover:bg-green-800 text-white px-2 py-1 text-base font-medium rounded-lg"
          >
            Apply Now
          </Link>
          <div className="flex items-center justify-between gap-2">
            {" "}
            <CirclePoundSterling
              size={20}
              className="bg-green-900 text-white rounded-full"
            />{" "}
            <p className="font-medium text-gray-700">
              USD ${minSalary} - ${maxSalary} per year
            </p>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
