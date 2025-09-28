"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterData {
  location: string;
  category: string;
  jobType: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
  };
}

export function TalentSidebar() {
  const [filterData, setFilterData] = useState<FilterData>({
    location: "",
    category: "anytime",
    jobType: {
      fullTime: false,
      partTime: false,
      contract: false,
    },
  });

  const handleInputChange = <K extends keyof FilterData>(
    field: K,
    value: FilterData[K]
  ) => {
    setFilterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobTypeChange = (
    jobTypeField: keyof FilterData["jobType"],
    value: boolean
  ) => {
    setFilterData((prev) => ({
      ...prev,
      jobType: {
        ...prev.jobType,
        [jobTypeField]: value,
      },
    }));
  };

  // Keep inputs in sync with slider
  // const handleSalaryInputChange = (value: string, index: number) => {
  //   const num = Number(value);
  //   if (!isNaN(num)) {
  //     const newRange = [...filterData.salaryRange] as [number, number];
  //     newRange[index] = num;
  //     // Ensure lower <= upper
  //     if (newRange[0] <= newRange[1]) {
  //       setFilterData((prev) => ({
  //         ...prev,
  //         salaryRange: newRange,
  //       }));
  //     }
  //   }
  // };

  // Log filter state every second
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Filter Data:", filterData);
    }, 5000);
    return () => clearInterval(interval);
  }, [filterData]);

  return (
    <div className="w-full p-6 bg-white rounded-lg space-y-4">
      <h2 className="font-semibold text-gray-800 leading-relaxed text-xl border-b">
        Filter
      </h2>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Location"
            value={filterData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black"
          />
        </div>
      </div>

      {/* <hr className="border-t border-gray-200" /> */}

      {/* Category Section */}
      <div className="space-y-3 pb-4">
        <h3 className="text-lg font-medium text-black">Category</h3>
        <Select
          value={filterData.category}
          onValueChange={(val) => handleInputChange("category", val)}
        >
          <SelectTrigger className="mt-1 p-4 rounded-lg !text-md text-black w-full">
            <SelectValue placeholder="Anytime" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anytime">Anytime</SelectItem>
            <SelectItem value="last-24-hours">Last 24 hours</SelectItem>
            <SelectItem value="last-week">Last week</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <hr className="border-t border-gray-200" /> */}

      {/* Job Type Section */}
      <div className="space-y-4 pb-3">
        <h3 className="text-lg font-medium text-black">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="full-time"
              checked={filterData.jobType.fullTime}
              onCheckedChange={(val) => handleJobTypeChange("fullTime", !!val)}
            />
            <Label
              htmlFor="full-time"
              className="text-md font-medium leading-none"
            >
              Full time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="part-time"
              checked={filterData.jobType.partTime}
              onCheckedChange={(val) => handleJobTypeChange("partTime", !!val)}
            />
            <Label
              htmlFor="part-time"
              className="text-md font-medium leading-none"
            >
              Part time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
              checked={filterData.jobType.contract}
              onCheckedChange={(val) => handleJobTypeChange("contract", !!val)}
            />
            <Label
              htmlFor="contract"
              className="text-md font-medium leading-none"
            >
              Contract
            </Label>
          </div>
        </div>
      </div>

      {/* <hr className="border-t border-gray-200" /> */}

      {/* Salary Range Section */}
      {/* <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">Salary Range</h3>
        <Slider
          value={filterData.salaryRange}
          onValueChange={(val) =>
            handleInputChange("salaryRange", val as [number, number])
          }
          step={100}
          min={0}
          max={200000}
          className="w-full"
        />
        <div className="flex space-x-4">
          <Input
            type="number"
            value={filterData.salaryRange[0]}
            onChange={(e) => handleSalaryInputChange(e.target.value, 0)}
            className="w-1/2"
          />
          <Input
            type="number"
            value={filterData.salaryRange[1]}
            onChange={(e) => handleSalaryInputChange(e.target.value, 1)}
            className="w-1/2"
          />
        </div>
      </div> */}
    </div>
  );
}
