"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { useGetUserQuery } from "@/redux/features/authApi";
import { Building } from "lucide-react";

export function ProfileOverview() {
  // RTK Query call
  const { data: userData, isLoading } = useGetUserQuery();
  const profileData = userData?.data
  console.log(profileData?.data,userData)
  // Loading or no data fallback
  if (isLoading || !profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        What recruiters will see
      </h1>

      <Card className="mb-8">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={getImageUrl(profileData?.image)}
                alt={profileData?.name || "User"}
              />
              <AvatarFallback className="text-lg">
                {profileData.name}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profileData?.profile?.firstName +
                      " " +
                      profileData?.profile?.lastName || "Unknown"}{" "}
                    <span className="text-gray-500 font-normal">
                      ({profileData?.pronouns || "N/A"})
                    </span>
                  </h2>
                  <p className="text-sm text-green-600 font-medium">
                    {profileData?.status || ""}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {profileData?.experienceYears || ""} •{" "}
                    {profileData?.location || ""} •{" "}
                    {profileData?.timezone || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Experience
            </h3>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <Building className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {profileData?.workExperience?.title || "N/A"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {profileData?.workExperience?.company || "N/A"}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  {profileData?.workExperience?.duration || "N/A"}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {profileData?.workExperience?.description || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Education
            </h3>
            <div className="space-y-3">
              {profileData?.education?.map((edu, index) => (
                <div key={index}>
                  <p className="font-medium text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">
                    {edu.institution} • {edu.year}
                  </p>
                </div>
              )) || <p>No education data</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
