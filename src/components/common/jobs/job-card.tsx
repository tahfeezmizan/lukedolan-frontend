// components/JobCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Calendar } from "lucide-react";
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
    <Card className="w-full shadow-sm hover:shadow-md transition rounded-2xl">
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5">
        {/* Left Info */}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{company}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {type}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {posted}
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col sm:items-end gap-2">
          <p className="font-medium text-green-600">{salary}</p>
          <Link href={"job/1"} className="bg-green-600 hover:bg-green-700 text-white">
            Apply Now
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
