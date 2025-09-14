"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save } from "lucide-react";

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

  const [educations, setEducations] = useState<EducationData[]>([]);

  const handleInputChange = (field: keyof EducationData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEducation = () => {
    setEducations((prev) => [...prev, formData]);
    console.log("Added Education:", formData);

    // reset form after adding
    setFormData({
      degreeTitle: "",
      major: "",
      instituteName: "",
      result: "",
      cgpa: "",
      scale: "",
      yearOfPassing: "",
      duration: "",
    });
  };

  const handleSave = () => {
    console.log("All Educations:", educations);
  };

  return (
    <div className="space-y-8">
      {/* Level of Education Section */}
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Level of Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="degreeTitle">Degree Title</Label>
            <Input
              id="degreeTitle"
              value={formData.degreeTitle}
              onChange={(e) => handleInputChange("degreeTitle", e.target.value)}
              placeholder="Bachelor of Computer Science"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="major">Major</Label>
            <Input
              id="major"
              value={formData.major}
              onChange={(e) => handleInputChange("major", e.target.value)}
              placeholder="BSc in CSE"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="instituteName">Institute Name</Label>
            <Input
              id="instituteName"
              value={formData.instituteName}
              onChange={(e) =>
                handleInputChange("instituteName", e.target.value)
              }
              placeholder="X International University"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="result">Result</Label>
            <Input
              id="result"
              value={formData.result}
              onChange={(e) => handleInputChange("result", e.target.value)}
              placeholder="Grade"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="cgpa">CGPA</Label>
            <Input
              id="cgpa"
              value={formData.cgpa}
              onChange={(e) => handleInputChange("cgpa", e.target.value)}
              placeholder="3.00"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="scale">Scale</Label>
            <Input
              id="scale"
              value={formData.scale}
              onChange={(e) => handleInputChange("scale", e.target.value)}
              placeholder="4"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="yearOfPassing">Year of Passing</Label>
            <Input
              id="yearOfPassing"
              value={formData.yearOfPassing}
              onChange={(e) =>
                handleInputChange("yearOfPassing", e.target.value)
              }
              placeholder="2022"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-90" htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="4 Years"
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleAddEducation}
          type="button"
          className="bg-green-600 hover:bg-green-700  text-white px-8 py-4 text-lg font-medium rounded-none flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>

        <Button
          onClick={handleSave}
          type="button"
          className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
