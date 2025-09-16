"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { EducationForm } from "./education-form";
import { PersonalDetailsForm } from "./personal-details-form";
import { WorkExperienceForm } from "./work-experience-form";
import { ResumeUpload } from "./resume-upload";
import { ProfileOverview } from "./profile-overview";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  return (
    <div className="bg-[#EBF1FA] ">
      <div className="p-4 overflow-hidden ">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile">Over View</TabsTrigger>
            <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
            <TabsTrigger value="resume">Resume / CV</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <ProfileOverview />
          </TabsContent>
          <TabsContent
            value="personal-details"
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <PersonalDetailsForm />
          </TabsContent>

          <TabsContent
            value="resume"
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <ResumeUpload />
          </TabsContent>

          <TabsContent
            value="education"
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <EducationForm />
          </TabsContent>

          <TabsContent
            value="work-experience"
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <WorkExperienceForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
