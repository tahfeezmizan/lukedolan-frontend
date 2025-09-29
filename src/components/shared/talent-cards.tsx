import { getImageUrl } from "@/lib/utils";
import { TalentProps } from "@/types/types";
import {
  Briefcase,
  BriefcaseBusiness,
  CheckCircle,
  Globe,
  Scissors,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TalentCards({ talent }: { talent: TalentProps }) {
  // Safely handle skills data - convert to array if it's a string or ensure it's an array
  const safeSkills = React.useMemo(() => {
    if (!talent.skills) return [];

    if (Array.isArray(talent.skills)) {
      return talent.skills;
    }

    if (typeof talent.skills === "string") {
      // If it's a comma-separated string, split it
      return (talent.skills as string)
        .split(",")
        .map((skill: string) => skill.trim())
        .filter((skill) => skill.length > 0);
    }

    return [];
  }, [talent.skills]);

  // Safely handle work experience
  const safeWorkExperience = React.useMemo(() => {
    if (!talent.workExperience) return [];

    if (Array.isArray(talent.workExperience)) {
      return talent.workExperience;
    }

    return [];
  }, [talent.workExperience]);

  // Safely handle country/location
  const location = talent.country || talent.city || "Location not specified";

  return (
    <div
      key={talent.id}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      <Link href={`/find-talent/${talent.id}`}>
        <div className="p-4 bg-gray-100 space-y-3 relative">
          <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-bold text-gray-700">
              Available For work
            </span>
          </div>

          <div className="flex justify-center mt-8">
            <div className="relative h-32">
              <Image
                src={getImageUrl(talent?.userId?.image)}
                alt={talent?.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <p className="text-base font-medium text-gray-600 text-center leading-relaxed">
            {talent?.expartes && talent?.expartes?.length > 0 ? (
              talent?.expartes?.map((s, i) => (
                <span key={i}>
                  {s}
                  {i < talent?.expartes?.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span>Not Provided</span>
            )}
          </p>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {talent?.userId?.name || "Luke Dolan"}
          </h3>

          {/* Details */}
          <div className="space-y-4">
            {/* Experience */}
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                5 years experience
              </span>
            </div>

            {/* Skills */}
            <div className="flex items-center gap-4 ">
              <Scissors className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                Skills:{" "}
                {talent?.skills && talent?.skills?.length > 0 ? (
                  talent?.skills?.map((s, i) => (
                    <span key={i}>
                      {s}
                      {i < talent?.skills?.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>Not Provided</span>
                )}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <Globe className="text-green-800" />
              <p className="text-gray-800 font-medium">{location}</p>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-4">
              {safeWorkExperience.length > 0 ? (
                safeWorkExperience.map((exp: any, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-800">
                      <span className="flex gap-2 font-medium">
                        <BriefcaseBusiness className="text-green-800" />
                        {exp?.jobTitle || "Position not specified"}
                      </span>
                      {exp?.companyName && `@ ${exp.companyName}`}
                      {exp?.employmentType && ` (${exp.employmentType})`}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-800 italic">No experience added yet</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
