"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface EducationData {
  degreeTitle: string;
  major: string;
  instituteName: string;
  result: string;
  cgpa: string;
  scale: string;
  yearOfPassing: string;
  duration: string;
}

export function EducationForm() {
  const [formData, setFormData] = useState<EducationData>({
    degreeTitle: "",
    major: "",
    instituteName: "",
    result: "",
    cgpa: "",
    scale: "",
    yearOfPassing: "",
    duration: "",
  });

  const handleInputChange = (field: keyof EducationData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEducation = () => {
    console.log("Education Form Data:", formData);
  };

  return (
    <div className="space-y-8">
      {/* Level of Education Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Level of Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              htmlFor="degreeTitle"
              className="text-sm font-medium text-gray-700"
            >
              Degree Title
            </Label>
            <Input
              id="degreeTitle"
              value={formData.degreeTitle}
              onChange={(e) => handleInputChange("degreeTitle", e.target.value)}
              placeholder="Bachelor of Computer Science"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="major"
              className="text-sm font-medium text-gray-700"
            >
              Major
            </Label>
            <Input
              id="major"
              value={formData.major}
              onChange={(e) => handleInputChange("major", e.target.value)}
              placeholder="BSc in CSE"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              htmlFor="instituteName"
              className="text-sm font-medium text-gray-700"
            >
              Institute Name
            </Label>
            <Input
              id="instituteName"
              value={formData.instituteName}
              onChange={(e) =>
                handleInputChange("instituteName", e.target.value)
              }
              placeholder="X International University"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="result"
              className="text-sm font-medium text-gray-700"
            >
              Result
            </Label>
            <Input
              id="result"
              value={formData.result}
              onChange={(e) => handleInputChange("result", e.target.value)}
              placeholder="Grade"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cgpa" className="text-sm font-medium text-gray-700">
              CGPA
            </Label>
            <Input
              id="cgpa"
              value={formData.cgpa}
              onChange={(e) => handleInputChange("cgpa", e.target.value)}
              placeholder="3.00"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <Label
              htmlFor="scale"
              className="text-sm font-medium text-gray-700"
            >
              Scale
            </Label>
            <Input
              id="scale"
              value={formData.scale}
              onChange={(e) => handleInputChange("scale", e.target.value)}
              placeholder="4"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="yearOfPassing"
              className="text-sm font-medium text-gray-700"
            >
              Year of passing
            </Label>
            <Input
              id="yearOfPassing"
              value={formData.yearOfPassing}
              onChange={(e) =>
                handleInputChange("yearOfPassing", e.target.value)
              }
              placeholder="27 Years"
              className="bg-gray-100 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="duration"
              className="text-sm font-medium text-gray-700"
            >
              Duration
            </Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="Doe"
              className="bg-gray-100 border-0"
            />
          </div>
        </div>

        <Button
          onClick={handleAddEducation}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>
    </div>
  );
}
