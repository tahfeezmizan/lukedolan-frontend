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
import { Textarea } from "../ui/textarea";
import LoadingSpinner from "@/lib/loading-spinner";

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
  bio: string;
  citizenship?: string;
  yearsOfExperience?: string;
  landLine: string;
  zipCode?: string;
}

export function PersonalDetailsForm() {
  const [skillInput, setSkillInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");
  const [languageInput, setLanguageInput] = useState(""); // ✅ new state for languages
  const [languages, setLanguages] = useState<string[]>([]); // ✅ store languages

  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");

  const profileData = userData?.profile;

  console.log("Profile data:", profileData);

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
      bio: "",
      mobile: "",
      dateOfBirth: "",
      gender: "",
      streetAddress: "",
      city: "",
      country: "",
      skills: [],
      expartes: [],
      citizenship: "",
      yearsOfExperience: "",
      landLine: "",
      zipCode: "",
    },
  });

  const skills = watch("skills");
  const expartes = watch("expartes");

  // ✅ Set form values when user data is loaded (Bio fix included)
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
        bio: profileData.bio || "", // ✅ fixed bio value
        citizenship: profileData.citizenship || "",
        yearsOfExperience: profileData.yearsOfExperience || "",
        landLine: profileData.landLine || "",
        zipCode: profileData.zipCode || "",
      });

      // ✅ if API provides languages, load them too
      if (profileData.languages) {
        setLanguages(profileData.languages);
      }
    }
  }, [profileData, reset]);

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();

  // === Skill functions ===
  const addSkill = () => {
    if (skillInput.trim()) {
      const existingSkills = profileData?.skills || [];
      const currentSkills = skills || [];
      const mergedSkills = [...new Set([...existingSkills, ...currentSkills])];
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
    const currentSkills = skills || [];
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

  // === Expertise functions ===
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
    const currentExpertise = expartes || [];
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

  // === Language functions ===
  const addLanguage = () => {
    if (languageInput.trim()) {
      const exists = languages.some(
        (lang) => lang.toLowerCase() === languageInput.trim().toLowerCase()
      );
      if (!exists) {
        setLanguages((prev) => [...prev, languageInput.trim()]);
        setLanguageInput("");
      } else {
        toast.error("This language already exists");
      }
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setLanguages((prev) => prev.filter((lang) => lang !== langToRemove));
  };

  const handleLanguageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
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
      languages, // ✅ include languages in API payload
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(finalData));

    try {
      const res = await updateProfile({ body: formData });
      console.log("Api", res);
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
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* === Personal Information Section === */}
      <h3 className="text-3xl font-semibold text-gray-900 mb-2">
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
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
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
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                  <SelectTrigger className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50">
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
          <div>
            <Label
              htmlFor="citizenship"
              className="text-lg font-medium text-gray-900"
            >
              Citizenship
            </Label>
            <Input
              id="citizenship"
              placeholder="citizenship"
              {...register("citizenship")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
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
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>

          <div className="">
            <Label
              htmlFor="yearsOfExperience"
              className="text-lg font-medium text-gray-900"
            >
              Years of experience
            </Label>
            <Input
              type="number"
              id="yearsOfExperience"
              placeholder="Enter years of experience"
              {...register("yearsOfExperience")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* === Bio === */}
      <div>
        <Label htmlFor="bio" className="text-lg font-medium text-gray-900">
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Describe yourself"
          {...register("bio", { required: "Bio is required" })}
          className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none bg-gray-50"
        />
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}
      </div>

      {/* === Skills === */}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleSkillKeyPress}
            placeholder="Add a skill (e.g., JavaScript, React)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addSkill}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize"
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
      </div>

      {/* === Expertise === */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise</h3>
        <div className="flex gap-2">
          <Input
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
            onKeyPress={handleExpertiseKeyPress}
            placeholder="Add an expertise (e.g., Frontend Development)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addExpertise}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {expartes && expartes.length > 0 ? (
            expartes.map((expertise, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize"
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
      </div>

      {/* ✅ New Language Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
        <div className="flex gap-2">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={handleLanguageKeyPress}
            placeholder="Add a language (e.g., English, Spanish)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addLanguage}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages && languages.length > 0 ? (
            languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                <span>{language}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(language)}
                  className="hover:text-red-600 capitalize"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No languages added yet</p>
          )}
        </div>
      </div>

      {/* === Address === */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
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
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="zipCode"
                className="text-lg font-medium text-gray-900"
              >
                Zip Code
              </Label>
              <Input
                type="number"
                id="zipCode"
                placeholder="Zip Code"
                {...register("zipCode")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
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
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <Label
              htmlFor="mobile"
              className="text-lg font-medium text-gray-900"
            >
              Mobile Number
            </Label>
            <Input
              id="mobile"
              placeholder="Mobile Number"
              {...register("mobile")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
          <div className="">
            <Label
              htmlFor="landLine"
              className="text-lg font-medium text-gray-900"
            >
              Landline Number
            </Label>
            <Input
              type="number"
              id="landLine"
              placeholder="landLine Number"
              {...register("landLine")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* === Save Button === */}
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
