"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUpdateProfileMutation,
  useGetMeQuery,
} from "@/redux/features/userApi";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EssentialPersonalData {
  firstName: string;
  lastName: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  streetAddress: string;
  city: string;
  country: string;
  skills: string[];
  expartes: string[];
}

export function PersonalDetailsForm() {
  const [skillInput, setSkillInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");

  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");
  const profileData = userData?.profile;

  const {
    register,
    handleSubmit,
    control,
    setValue,

    watch,
    reset,
    formState: { errors },
  } = useForm<EssentialPersonalData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      dateOfBirth: "",
      gender: "",
      streetAddress: "",
      city: "",
      country: "",
      skills: [],
      expartes: [],
    },
  });

  // Watch skills and expertise to get real-time updates
  const skills = watch("skills");
  const expartes = watch("expartes");

  // Set form values when user data is loaded
  useEffect(() => {
    if (profileData) {
      console.log("Loading profile data:", profileData);
      reset({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        mobile: profileData.mobile || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: profileData.gender || "",
        streetAddress: profileData.streetAddress || "",
        city: profileData.city || "",
        country: profileData.country || "",
        skills: profileData.skills || [],
        expartes: profileData.expartes || [],
      });
    }
  }, [profileData, reset]);

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();

  const addSkill = () => {
    if (skillInput.trim()) {
      // Always take latest skills from profile + form
      const existingSkills = profileData?.skills || [];
      const currentSkills = skills || [];

      // Merge old + new
      const mergedSkills = [...new Set([...existingSkills, ...currentSkills])];

      // Check if already exists
      const skillExists = mergedSkills.some(
        (skill) => skill.toLowerCase() === skillInput.trim().toLowerCase()
      );

      if (!skillExists) {
        const updatedSkills = [...mergedSkills, skillInput.trim()];
        setValue("skills", updatedSkills, { shouldValidate: true });
        setSkillInput("");
      } else {
        toast.error("This skill already exists");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = skills || []; // Use watched skills instead of getValues
    const updatedSkills = currentSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Expertise functions - FIXED: Always include existing expertise
  // Expertise functions
  const addExpertise = () => {
    if (expertiseInput.trim()) {
      const existingExpertise = profileData?.expartes || [];
      const currentExpertise = expartes || [];

      const mergedExpertise = [
        ...new Set([...existingExpertise, ...currentExpertise]),
      ];

      const expertiseExists = mergedExpertise.some(
        (exp) => exp.toLowerCase() === expertiseInput.trim().toLowerCase()
      );

      if (!expertiseExists) {
        const updatedExpertise = [...mergedExpertise, expertiseInput.trim()];
        setValue("expartes", updatedExpertise, { shouldValidate: true });
        setExpertiseInput("");
      } else {
        toast.error("This expertise already exists");
      }
    }
  };
  const removeExpertise = (expertiseToRemove: string) => {
    const currentExpertise = expartes || []; // Use watched expartes instead of getValues
    const updatedExpertise = currentExpertise.filter(
      (expertise) => expertise !== expertiseToRemove
    );
    setValue("expartes", updatedExpertise, { shouldValidate: true });
  };

  const handleExpertiseKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExpertise();
    }
  };

  const onSubmit = async (data: EssentialPersonalData) => {
    console.log("Personal Details Form Data:", data);

    const oldSkills = profileData?.profile?.skills || [];
    const oldExpertise = profileData?.profile?.expartes || [];
    const mergedSkills = [...new Set([...oldSkills, ...(data.skills || [])])];
    const mergedExpertise = [
      ...new Set([...oldExpertise, ...(data.expartes || [])]),
    ];

    const finalData = {
      ...data,
      skills: mergedSkills,
      expartes: mergedExpertise,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(finalData));

    try {
      const res = await updateProfile({ body: formData });
      console.log(res);
      if (res?.data?.success) {
        toast.success("Profile updated successfully");
        refetch();
      } else {
        toast.error(res?.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <h3 className="text-3xl font-semibold text-gray-900 mb-4">
        Personal Information
      </h3>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-lg font-medium text-gray-900"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-lg font-medium text-gray-900"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label
              htmlFor="dateOfBirth"
              className="text-lg font-medium text-gray-900"
            >
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
          </div>
          <div>
            <Label
              htmlFor="gender"
              className="text-lg font-medium text-gray-900"
            >
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="mobile" className="text-lg font-medium text-gray-900">
            Mobile Number
          </Label>
          <Input
            id="mobile"
            placeholder="Mobile Number"
            {...register("mobile")}
            className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleSkillKeyPress}
              placeholder="Add a skill (e.g., JavaScript, React, Node.js)"
              className="p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            <Button
              type="button"
              onClick={addSkill}
              className="bg-green-900 hover:bg-green-800 text-white px-6"
            >
              Add
            </Button>
          </div>

          {/* Skills Display */}
          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added yet</p>
            )}
          </div>

          {/* Debug info */}
          <div className="text-xs text-gray-400">
            Current skills in form: {skills?.join(", ") || "None"}
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expertise</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyPress={handleExpertiseKeyPress}
              placeholder="Add an expertise (e.g., Frontend Development, UI/UX Design)"
              className="p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            <Button
              type="button"
              onClick={addExpertise}
              className="bg-green-900 hover:bg-green-800 text-white px-6"
            >
              Add
            </Button>
          </div>

          {/* Expertise Display */}
          <div className="flex flex-wrap gap-2">
            {expartes && expartes.length > 0 ? (
              expartes.map((expertise, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm"
                >
                  <span>{expertise}</span>
                  <button
                    type="button"
                    onClick={() => removeExpertise(expertise)}
                    className="hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No expertise added yet</p>
            )}
          </div>

          {/* Debug info */}
          <div className="text-xs text-gray-400">
            Current expertise in form: {expartes?.join(", ") || "None"}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="streetAddress"
              className="text-lg font-medium text-gray-900"
            >
              Street Address
            </Label>
            <Input
              id="streetAddress"
              placeholder="123 Main Street"
              {...register("streetAddress")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="city"
                className="text-lg font-medium text-gray-900"
              >
                City
              </Label>
              <Input
                id="city"
                placeholder="General Trias"
                {...register("city")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="country"
                className="text-lg font-medium text-gray-900"
              >
                Country
              </Label>
              <Input
                id="country"
                placeholder="Philippines"
                {...register("country")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-sm"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            Error updating profile: {error?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
