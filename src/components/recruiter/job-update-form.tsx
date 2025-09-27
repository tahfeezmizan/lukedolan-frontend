"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import { Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function JobUpdateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostJobFormData>({
    defaultValues: {
      title: "",
      category: "",
      jobLocation: "",
      type: undefined,
      startDate: undefined,
      endDate: undefined,
      minSalary: 0,
      maxSalary: 0,
      description: "",
      responsibilities: "",
    },
  });
  const { id } = useParams();
  const route = useRouter();

  const { data: categories } = useGetCategoryQuery({});
  const { data: jobs } = useGetAllJobsQuery({});
  const [updateJob] = useUpdateJobMutation();

  const job = jobs?.find((job: any) => job._id === id);

  useEffect(() => {
    if (job) {
      reset({
        title: job.title || "",
        // ✅ Fixed: Extract _id from category object to match SelectItem value
        category: job.category?._id || job.category || "",
        jobLocation: job.jobLocation || "",
        type: job.type || undefined,
        startDate: job.startDate ? job.startDate.split("T")[0] : undefined,
        endDate: job.endDate ? job.endDate.split("T")[0] : undefined,
        minSalary: job.minSalary || 0,
        maxSalary: job.maxSalary || 0,
        description: job.description || "",
        responsibilities: job.responsibilities || "",
      });
    }
  }, [job, reset]);

  const onSubmit = async (data: PostJobFormData) => {
    const updateData = {
      title: data.title,
      category: data.category,
      jobLocation: data.jobLocation,
      type: data.type,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      description: data.description,
      responsibilities: data.responsibilities,
    };

    try {
      const res = await updateJob({
        id: id,
        data: updateData,
      }).unwrap();

      if (res.success) {
        toast.success("✅ Job Update Sucessfully");
        route.push("/recruiter/jobs");
      }
    } catch (error) {
      toast.error("❌ Job creation failed");
      // console.error("❌ Job creation failed:", error);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Update Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* Job Title */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-medium text-gray-90">
              Job Title
            </Label>
            <Input
              id="title"
              placeholder="Hair Stylist"
              {...register("title", { required: "Job title is required" })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Job Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-lg font-medium text-gray-90"
            >
              Job Category
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Job category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-lg !text-lg text-black w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Employment Type */}
          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-90">
              Employment Type
            </Label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Employment type is required" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex items-center space-x-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Full-time" id="Full-time" />
                    <Label
                      htmlFor="Full-time"
                      className="text-md font-medium text-gray-600"
                    >
                      Full-time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Remote" id="Remote" />
                    <Label
                      htmlFor="Remote"
                      className="text-md font-medium text-gray-600"
                    >
                      Remote
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Freelance" id="Freelance" />
                    <Label
                      htmlFor="Freelance"
                      className="text-md font-medium text-gray-600"
                    >
                      Freelance
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Job Location */}
          <div className="space-y-2">
            <Label
              htmlFor="jobLocation"
              className="text-lg font-medium text-gray-90"
            >
              Job Location
            </Label>
            <Input
              id="jobLocation"
              placeholder="Job location"
              {...register("jobLocation", {
                required: "jobLocation is required",
              })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
            />
            {errors.jobLocation && (
              <p className="text-red-500 text-sm">
                {errors.jobLocation.message}
              </p>
            )}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className="text-lg font-medium text-gray-90"
            >
              Starting Date
            </Label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "Starting date is required",
                })}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="endDate"
              className="text-lg font-medium text-gray-90"
            >
              End Date
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
          <Label className="text-lg font-medium text-gray-90">
            Salary Range
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Min"
              {...register("minSalary", {
                required: "Minimum salary is required",
              })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              {...register("maxSalary", {
                required: "Maximum salary is required",
              })}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
            />
          </div>
          {(errors.minSalary || errors.maxSalary) && (
            <p className="text-red-500 text-sm">Salary range is required</p>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-90"
          >
            Job Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the role"
            {...register("description", {
              required: "Job description is required",
            })}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Job Responsibilities */}
        <div className="space-y-2">
          <Label
            htmlFor="responsibilities"
            className="text-lg font-medium text-gray-90"
          >
            Job Responsibilities
          </Label>
          <Textarea
            id="responsibilities"
            placeholder="Describe the Job responsibilities"
            {...register("responsibilities", {
              required: "Job responsibilities are required",
            })}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none"
          />
          {errors.responsibilities && (
            <p className="text-red-500 text-sm">
              {errors.responsibilities.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg"
        >
          Update Job Post
        </Button>
      </form>
    </div>
  );
}
