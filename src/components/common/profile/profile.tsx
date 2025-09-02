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
  const activeTab = searchParams.get("tab") || "personal-details";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  const handleSave = () => {
    console.log("Save button clicked - saving all form data");
    // This would typically save all form data
  };

  const getHeaderButtonText = () => {
    switch (activeTab) {
      case "education":
        return "Educational Details";
      case "work-experience":
        return "Experience Details";
      default:
        return "Edit Personal Details";
    }
  };

  return (
    <div className="bg-[#EBF1FA] pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ">
        {/* Header with Edit button */}
        {/* <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Edit className="h-4 w-4" />
            {getHeaderButtonText()}
          </Button>
        </div> */}

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Over View</TabsTrigger>
            <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
            <TabsTrigger value="resume">Resume / CV</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
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
