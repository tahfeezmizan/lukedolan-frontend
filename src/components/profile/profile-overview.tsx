"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/utils";
import { useGetUserQuery } from "@/redux/features/authApi";
import { Building, MapPin, Calendar, Briefcase } from "lucide-react";

// Type definitions based on your data structure
interface WorkExperience {
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  experience: string;
}

interface Education {
  degreeTitle: string;
  instituteName: string;
  major: string;
  scale: string;
  duration: string;
  yearOfPassing: string;
  cgpa: string;
}

interface Profile {
  age: string | null;
  bio: string | null;
  citizenship: string | null;
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  education: Education[];
  firstName: string;
  gender: string;
  landLine: string | null;
  languages: string[];
  lastName: string;
  maritalStatus: string | null;
  mobile: string;
  openToWork: boolean;
  preferredWorkType: string | null;
  previousEmployment: string | null;
  province: string | null;
  resume: string;
  salaryExpectation: string | null;
  skills: string[];
  streetAddress: string;
  updatedAt: string;
  userId: string;
  workExperience: WorkExperience[];
  zipCode: string | null;
  _id: string;
  __v: number;
}

interface UserData {
  companyName: string;
  createdAt: string;
  email: string;
  image: string;
  name: string;
  profile: Profile;
  role: string;
  roleProfile: string;
  status: string;
  subscribe: boolean;
  updatedAt: string;
  verified: boolean;
  __v: number;
  _id: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserData;
}

export function ProfileOverview() {
  // RTK Query call with proper typing
  const { data: userData, isLoading } = useGetUserQuery() as {
    data?: ApiResponse;
    isLoading: boolean;
  };

  const profileData: UserData | undefined = userData?.data;

  console.log("Profile Data:", profileData);

  // Loading or no data fallback
  if (isLoading || !profileData) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">Loading profile...</span>
      </div>
    );
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
                {profileData?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profileData?.profile?.firstName &&
                    profileData?.profile?.lastName
                      ? `${profileData.profile.firstName} ${profileData.profile.lastName}`
                      : profileData?.name || "Unknown User"}
                  </h2>
                  <p className="text-sm text-green-600 font-medium">
                    {profileData?.status || "Active"}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                    {profileData?.profile?.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profileData.profile.city}
                        {profileData.profile.country &&
                          `, ${profileData.profile.country}`}
                      </span>
                    )}
                    {profileData?.profile?.mobile && (
                      <span>• {profileData.profile.mobile}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          {profileData?.profile?.workExperience &&
            profileData.profile.workExperience.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {profileData.profile.workExperience.map(
                    (exp: WorkExperience, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {exp.jobTitle || "Position Title"}
                          </h4>
                          <p className="text-gray-600 font-medium">
                            {exp.companyName || "Company Name"}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1 mb-2">
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </span>
                            )}
                            {exp.employmentType && (
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
            )}

          {/* Education Section */}
          {profileData?.profile?.education &&
            profileData.profile.education.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  {profileData.profile.education.map(
                    (edu: Education, index: number) => (
                      <div
                        key={index}
                        className="border-l-2 border-gray-200 pl-4"
                      >
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
                          {edu.duration && (
                            <span>• Duration: {edu.duration}</span>
                          )}
                          {edu.cgpa && edu.scale && (
                            <span>
                              • CGPA: {edu.cgpa}/{edu.scale}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {profileData?.profile?.gender && (
                <div>
                  <span className="font-medium text-gray-700">Gender:</span>
                  <span className="ml-2 text-gray-600">
                    {profileData.profile.gender}
                  </span>
                </div>
              )}
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
