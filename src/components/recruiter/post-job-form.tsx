"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "lucide-react";

interface PostJobFormData {
  jobTitle: string;
  jobCategory: string;
  employmentType: string;
  startingDate: string;
  endDate: string;
  salaryMin: string;
  salaryMax: string;
  jobDescription: string;
  jobResponsibilities: string;
}

export function PostJobForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostJobFormData>({
    defaultValues: {
      jobTitle: "",
      jobCategory: "",
      employmentType: "",
      startingDate: "",
      endDate: "",
      salaryMin: "",
      salaryMax: "",
      jobDescription: "",
      jobResponsibilities: "",
    },
  });

  const onSubmit = (data: PostJobFormData) => {
    console.log("[RHF] Job Post Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="jobTitle" className="text-lg font-medium text-gray-90">
          Job Title
        </Label>
        <Input
          id="jobTitle"
          placeholder="Hair Stylist"
          {...register("jobTitle", { required: "Job title is required" })}
          className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Job Category */}
      <div className="space-y-2">
        <Label
          htmlFor="jobCategory"
          className="text-lg font-medium text-gray-90"
        >
          Job Category
        </Label>
        <Controller
          name="jobCategory"
          control={control}
          rules={{ required: "Job category is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="mt-1 p-4 rounded-lg !text-lg text-black w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beauty-wellness">
                  Beauty & Wellness
                </SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.jobCategory && (
          <p className="text-red-500 text-sm">{errors.jobCategory.message}</p>
        )}
      </div>

      {/* Employment Type */}
      <div className="space-y-3 ">
        <Label className="text-lg font-medium text-gray-90">
          Employment Type
        </Label>
        <Controller
          name="employmentType"
          control={control}
          rules={{ required: "Employment type is required" }}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex space-x-8"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label
                  htmlFor="full-time"
                  className="text-md font-medium text-gray-600"
                >
                  Full-time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label
                  htmlFor="part-time"
                  className="text-md font-medium text-gray-600"
                >
                  Part time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="freelance" id="freelance" />
                <Label
                  htmlFor="freelance"
                  className="text-md font-medium text-gray-600"
                >
                  Freelance
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.employmentType && (
          <p className="text-red-500 text-sm">
            {errors.employmentType.message}
          </p>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="startingDate"
            className="text-lg font-medium text-gray-90"
          >
            Starting Date
          </Label>
          <div className="relative">
            <Input
              id="startingDate"
              type="date"
              {...register("startingDate", {
                required: "Starting date is required",
              })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.startingDate && (
            <p className="text-red-500 text-sm">
              {errors.startingDate.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-lg font-medium text-gray-90">
            End date
          </Label>
          <div className="relative">
            <Input
              id="endDate"
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <Label className="text-lg font-medium text-gray-90">Salary Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min"
            {...register("salaryMin", {
              required: "Minimum salary is required",
            })}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
          />
          <Input
            type="number"
            placeholder="Max"
            {...register("salaryMax", {
              required: "Maximum salary is required",
            })}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
          />
        </div>
        {(errors.salaryMin || errors.salaryMax) && (
          <p className="text-red-500 text-sm">Salary range is required</p>
        )}
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label
          htmlFor="jobDescription"
          className="text-lg font-medium text-gray-90"
        >
          Job Description
        </Label>
        <Textarea
          id="jobDescription"
          placeholder="Describe the role"
          {...register("jobDescription", {
            required: "Job description is required",
          })}
          className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none"
        />
        {errors.jobDescription && (
          <p className="text-red-500 text-sm">
            {errors.jobDescription.message}
          </p>
        )}
      </div>

      {/* Job Responsibilities */}
      <div className="space-y-2">
        <Label
          htmlFor="jobResponsibilities"
          className="text-lg font-medium text-gray-90"
        >
          Job Responsibilities
        </Label>
        <Textarea
          id="jobResponsibilities"
          placeholder="Describe the Job responsibilities"
          {...register("jobResponsibilities", {
            required: "Job responsibilities are required",
          })}
          className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none"
        />
        {errors.jobResponsibilities && (
          <p className="text-red-500 text-sm">
            {errors.jobResponsibilities.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg"
      >
        Job post
      </Button>
    </form>
  );
}
