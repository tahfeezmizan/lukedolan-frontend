"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  experience: string;
}

export function WorkExperienceForm() {
  const [formData, setFormData] = useState<WorkExperienceData>({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    experience: "",
  });

  const handleInputChange = (
    field: keyof WorkExperienceData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddExperience = () => {
    console.log("Work Experience Form Data:", formData);
  };

  return (
    <div className="space-y-8">
      {/* Experience Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Experience</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              htmlFor="jobTitle"
              className="text-sm font-medium text-gray-700"
            >
              Job Title
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="Senior Barber"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="text-sm font-medium text-gray-700"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Luxe Beauty Longue"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="London"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="employmentType"
              className="text-sm font-medium text-gray-700"
            >
              Employment Type
            </Label>
            <Input
              id="employmentType"
              value={formData.employmentType}
              onChange={(e) =>
                handleInputChange("employmentType", e.target.value)
              }
              placeholder="Full Time"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-700"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              placeholder="12/02/2025"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-700"
            >
              End Date
            </Label>
            <Input
              id="endDate"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              placeholder="30/12/2025"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="experience"
              className="text-sm font-medium text-gray-700"
            >
              Experience
            </Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              placeholder="2 Years"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <Button
          onClick={handleAddExperience}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>
    </div>
  );
}
