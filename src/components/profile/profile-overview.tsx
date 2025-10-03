"use client";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import { Education, UserData, WorkExperience } from "@/types/profileTypes";
import { Building, Calendar, CircleUserRound, MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

// Type definitions based on your data structure

export function ProfileOverview() {
  // RTK Query call with proper typing
  const { data: userData, isLoading } = useGetMeQuery("");
  const profileData: UserData | undefined = userData?.profile;

  console.log("Profile Data:", profileData);

  // Loading or no data fallback
  if (isLoading || !profileData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        What recruiters will see
      </h1>

      <Card className="mb-8">
        <CardContent className="p-8 space-y-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div className="flex gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow-lg ">
                {userData?.image ? (
                  <Image
                    width={1000}
                    height={1000}
                    src={getImageUrl(userData?.image)}
                    alt={userData?.name ?? "User"}
                    className="w-32 h-32 object-cover "
                  />
                ) : (
                  <CircleUserRound className="size-20  object-cover" />
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userData?.name && userData?.name
                      ? `${userData?.name}`
                      : profileData?.name || "Unknown User"}
                  </h2>
                  <p className="text-sm  font-medium">2 years of exp</p>

                  <Badge
                    variant={"outline"}
                    className="bg-green-200 border-green-200"
                  >
                    {userData?.status || "Deactive"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p>{`${profileData?.city}, ${profileData?.country}`}</p>
              <p>{userData?.email}</p>
              <p>{profileData?.mobile}</p>
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Personal Overview
            </h3>
            <p className="text-base text-gray-700 leading-relaxed">
              {profileData?.bio}
            </p>
          </div>

          {/* Work Experience Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Work Experience
            </h3>
            <div className="space-y-6">
              {profileData?.workExperience?.map(
                (exp: WorkExperience, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {exp?.jobTitle || "Position Title"}
                      </h4>
                      <p className=" text-gray-600 font-medium">
                        {exp?.companyName || "Company Name"}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1 mb-2">
                        {exp?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp?.location}
                          </span>
                        )}
                        {exp?.employmentType && (
                          <span>• {exp.employmentType}</span>
                        )}
                        {exp.startDate && exp.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              exp.startDate
                            ).toLocaleDateString()} -{" "}
                            {new Date(exp.endDate).toLocaleDateString()}
                          </span>
                        )}
                        {exp.experience && <span>• {exp.experience}</span>}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Education
            </h3>
            <div className="space-y-4">
              {profileData?.education.map((edu: Education, index: number) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {edu.degreeTitle || "Degree"}
                    {edu.major && ` in ${edu.major}`}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {edu.instituteName || "Institution"}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    {edu.yearOfPassing && (
                      <span>Graduated: {edu.yearOfPassing}</span>
                    )}
                    {edu.duration && <span>• Duration: {edu.duration}</span>}
                    {edu.cgpa && edu.scale && (
                      <span>
                        • CGPA: {edu.cgpa}/{edu.scale}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* skills Section */}
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expartes</h3>
            <div className="space-y-4">
              {profileData?.expartes?.map((expert) => (
                <Badge variant={"outline"} className="mx-0.5 text-md">
                  {expert}
                </Badge>
              ))}
            </div>
          </div>

          {/* skills Section */}
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
            <div className="space-y-4">
              {profileData?.skills?.map((skill) => (
                <Badge variant={"outline"} className="mx-0.5 text-md">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Gender:</span>
                <span className="ml-2 text-gray-600">{profileData.gender}</span>
              </div>

              {profileData?.profile?.dateOfBirth && (
                <div>
                  <span className="font-medium text-gray-700">
                    Date of Birth:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {new Date(
                      profileData.profile.dateOfBirth
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
              {profileData?.email && (
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">
                    {profileData.email}
                  </span>
                </div>
              )}
              {profileData?.profile?.streetAddress && (
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="ml-2 text-gray-600">
                    {profileData.profile.streetAddress}
                  </span>
                </div>
              )}
              {profileData?.profile?.openToWork !== undefined && (
                <div>
                  <span className="font-medium text-gray-700">
                    Open to Work:
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      profileData.profile.openToWork
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {profileData.profile.openToWork ? "Yes" : "No"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section (if available) */}
          {profileData?.profile?.skills &&
            profileData.profile.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.profile.skills.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          {/* Expertises Section (if available) */}
          {profileData?.profile?.expartes &&
            profileData.profile.expartes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Expertises
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.profile.expartes.map(
                    (data: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {data}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Languages Section (if available) */}
          {profileData?.profile?.languages &&
            profileData.profile.languages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.profile.languages.map(
                    (language: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Resume Section (if available) */}
          {profileData?.profile?.resume && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resume
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={getImageUrl(profileData.profile.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                >
                  View Resume
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
