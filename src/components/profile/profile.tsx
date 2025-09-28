"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { EducationForm } from "./education-form";
import { PersonalDetailsForm } from "./personal-details-form";
import { WorkExperienceForm } from "./work-experience-form";
import { ResumeUpload } from "./resume-upload";
import { ProfileOverview } from "./profile-overview";
import ProfileSection from "./profile-section";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  return (
    <div className="bg-[#EBF1FA]  ">
      <div className="p-4  overflow-hidden ">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 bg-white mb-8 ">
            <TabsTrigger value="profile" className="cursor-pointer">Over View</TabsTrigger>
            <TabsTrigger value="personal-details" className="cursor-pointer">Personal Details</TabsTrigger>
            <TabsTrigger value="resume" className="cursor-pointer">Resume / CV</TabsTrigger>
            <TabsTrigger value="education" className="cursor-pointer">Education</TabsTrigger>
            <TabsTrigger value="work-experience" className="cursor-pointer">Work Experience</TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            
            <ProfileOverview />
          </TabsContent>
          <TabsContent
            value="personal-details"
            className="bg-white rounded-lg p-8 shadow-none border-none space-y-6"
          >
            <ProfileSection />
            <PersonalDetailsForm />
          </TabsContent>

          <TabsContent
            value="resume"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <ResumeUpload />
          </TabsContent>

          <TabsContent
            value="education"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <EducationForm />
          </TabsContent>

          <TabsContent
            value="work-experience"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <WorkExperienceForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
