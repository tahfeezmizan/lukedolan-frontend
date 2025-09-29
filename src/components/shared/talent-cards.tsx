import { getImageUrl } from "@/lib/utils";
import { TalentProps } from "@/types/types";
import { Briefcase, BriefcaseBusiness, CheckCircle, Globe, PoundSterling, Scissors } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TalentCards({ talent }: { talent: TalentProps }) {

  const safeSkills = React.useMemo(() => {
    if (!talent.skills) return [];
    
    if (Array.isArray(talent.skills)) {
      return talent.skills;
    }
    
    if (typeof talent.skills === 'string') {
  
      return (talent.skills as string).split(',').map((skill: string) => skill.trim()).filter(skill => skill.length > 0);
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

  
  const location = talent.country || talent.city || 'Location not specified';

  return (
    <div
      key={talent._id}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      <Link href={`/find-talent/${talent?.userId && talent?.userId._id}`}>
        <div className="p-4 bg-gray-100 space-y-3 relative">
          <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-bold text-gray-700">
              Available For work
            </span>
          </div>
          <p>{talent.title}</p>
          <div className="flex justify-center mt-8">
            <div className="relative h-32">
              {talent?.userId?.image ? (
                <Image
                  src={getImageUrl(talent.userId.image)}
                  alt={"image"}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {talent.name}
          </h3>

          {/* Details */}
          <div className="space-y-4">
            {/* Skills */}
            <div className="flex items-center gap-4">
              <Scissors className="w-8 h-8 bg-white p-1 rounded-full text-green-900 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {safeSkills.length > 0 ? (
                  safeSkills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No skills added
                  </p>
                )}
              </div>
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