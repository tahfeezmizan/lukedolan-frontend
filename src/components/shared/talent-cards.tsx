import { TalentProps } from "@/types/types";
import { Briefcase, CheckCircle, PoundSterling, Scissors } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function TalentCards({ talent }: { talent: TalentProps }) {
  return (
    <div
      key={talent.id}
      className="bg-white border overflow-hidden border-gray-200 shadow"
    >
      <div className="p-4 bg-gray-100 space-y-3 relative">
        <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-xs font-bold text-gray-700">
            Available For work
          </span>
        </div>

        <div className="flex justify-center mt-8">
          <div className="relative">
            <Image
              src={talent.image || "/placeholder.svg"}
              alt={talent.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <p className="text-base font-medium text-gray-600 text-center leading-relaxed">
          {talent.title}
        </p>
      </div>

      <div className="p-5 ">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {talent.name}
        </h3>

        {/* Details */}
        <div className="space-y-4">
          {/* Experience */}
          <div className="flex items-center gap-4">
            <Briefcase className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
            <span className="text-lg leading-tight text-gray-700">
              {talent.experience}
            </span>
          </div>

          {/* Skills */}
          <div className="flex items-center gap-4 ">
            <Scissors className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
            <span className="text-lg leading-tight text-gray-700">
              Skills: {talent.skills}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <PoundSterling className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
            <span className="text-lg font-semibold text-gray-900">
              {talent.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
