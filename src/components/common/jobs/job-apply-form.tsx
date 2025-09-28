"use client";

import { useApplyJobMutation } from "@/redux/features/application";
import { ApiResponse } from "@/types/profileTypes";
import { ApiError, JobApplyFormInputs } from "@/types/types";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function JobApplyForm() {
  const params = useParams();
  const { id, slug } = params;
  
  const jobTitle = decodeURIComponent(id as string);
  const jobSlug: string = Array.isArray(slug) ? slug[0] : slug ?? "";

  const [applyJob] = useApplyJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JobApplyFormInputs>();

  const onSubmit = async (data: JobApplyFormInputs) => {
    const resumeFile = data.resume?.[0] || null;

    try {
      const formData = new FormData();
      formData.append("job", jobSlug);
      formData.append("name", data.name);
      formData.append("title", jobTitle);
      formData.append("location", data.location);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("experience", data.experience.toString());

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = (await applyJob(formData)) as {
        data?: ApiResponse;
        error?: ApiError;
      };

      if (res.data?.success) {
        toast.success("Job application successfully");
      } else {
        toast.error(res.error?.data?.message || "Something went wrong");
      }

      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  // Watch selected file for display
  const resumeFile = watch("resume")?.[0];

  return (
    <div className="pt-10 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Job Application
        </h1>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="000 0000 0000"
              {...register("phone", { required: "Phone is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="City, Country"
              {...register("location", { required: "Location is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience
            </label>
            <input
              type="number"
              id="experience"
              placeholder="2 years"
              {...register("experience", {
                required: "Experience is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.experience && (
              <p className="text-sm text-red-500">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Resume Upload
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              {...register("resume", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {resumeFile && (
              <p className="mt-1 text-sm text-green-600">
                Selected: {resumeFile.name}
              </p>
            )}
            {errors.resume && (
              <p className="text-sm text-red-500">Resume is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
}
