"use client";

import { getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import Image from "next/image";

export default function CompanyProfile() {
  const { data } = useGetMeQuery(undefined);
  const profileData = data?.profile;

  // console.log(data)

  // console.log("Active", profileData);
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Company Profile</h1>

      {/* Company Logo */}
      <div className="mb-8">
        <Image
          src={getImageUrl(profileData?.companyLogo)}
          alt={profileData?.companyName}
          width={80}
          height={80}
          className="w-20 h-20 border p-2 rounded"
        />
      </div>

      {/* Company Name */}
      <div className="mb-8 space-y-1">
        <h3 className="text-base">Company Name</h3>
        <p className="text-lg font-semibold">{profileData?.companyName}</p>
        <p className="text-lg font-semibold">
          {profileData?.companyEmail || "Email not available"}
        </p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="block text-xl font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p>{profileData?.companyDescription || "Description not update"}</p>
      </div>

      {/* Responsibilities */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Responsibilities
        </h2>
        <div className="space-y-3">
          {responsibilities.map((responsibility, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {responsibility}
              </p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Save Button */}
      {/* <Button
        onClick={handleSave}
        className="w-full bg-green-900 hover:bg-green-800 rounded-lg text-white py-3 text-base font-medium"
      >
        Save Change
      </Button> */}
    </div>
  );
}
