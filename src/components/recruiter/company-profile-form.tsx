"use client";

import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface CompanyFormData {
  companyName: string;
  companyDescription: string;
  companyEmail: string;
  phone: string;
  companyWebsite: string;
  location: string;
  linkedinProfile: string;
  twitterProfile: string;
  facebookProfile: string;
  instagramProfile: string;
  companyLogo: File | null;
}

export function CompanyProfileForm() {
  const { register, handleSubmit, setValue, reset } = useForm<CompanyFormData>({
    defaultValues: {
      companyName: "",
      companyDescription: "",
      companyEmail: "",
      phone: "",
      companyWebsite: "",
      location: "",
      linkedinProfile: "",
      twitterProfile: "",
      facebookProfile: "",
      instagramProfile: "",
      companyLogo: null,
    },
  });

  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();
  const { data } = useGetMeQuery(undefined);
  const profileData = data?.profile;

  // ✅ Pre-fill the form when data is available
  useEffect(() => {
    if (profileData) {
      reset({
        companyName: profileData.companyName || "",
        companyDescription: profileData.companyDescription || "",
        companyEmail: profileData.companyEmail || "",
        phone: profileData.phone || "",
        companyWebsite: profileData.companyWebsite || "",
        location: profileData.location || "",
        linkedinProfile: profileData.linkedinProfile || "",
        twitterProfile: profileData.twitterProfile || "",
        facebookProfile: profileData.facebookProfile || "",
        instagramProfile: profileData.instagramProfile || "",
        companyLogo: null,
      });
    }
  }, [profileData, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("companyLogo", file);
  };

  const onSubmit = async (data: CompanyFormData) => {
    console.log("Form DAta",data);
    try {
      const formData = new FormData();

      formData.append("companyName", data.companyName);
      formData.append("companyDescription", data.companyDescription);
      formData.append("companyEmail", data.companyEmail);
      formData.append("phone", data.phone);
      formData.append("companyWebsite", data.companyWebsite);
      formData.append("location", data.location);
      formData.append("linkedinProfile", data.linkedinProfile);
      formData.append("twitterProfile", data.twitterProfile);
      formData.append("facebookProfile", data.facebookProfile);
      formData.append("instagramProfile", data.instagramProfile);

      if (data.companyLogo) {
        formData.append("companyLogo", data.companyLogo);
      }

      const res = await updateProfile({ body: formData });

      if (res?.data?.success) {
        console.log(res);
        toast.success("Company profile updated successfully");
        // router.push("/recruiter/company");
      } else if (res?.error) {
        const err = res.error as FetchBaseQueryError;
        const errorMessage =
          (err.data as { message?: string })?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* companyLogo Upload */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-gray-90">
            Company Logo
          </Label>
          <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors p-4 flex flex-col items-center justify-center">
            {profileData?.companyLogo ? (
              <div className="mb-4">
                <Image
                  src={
                    profileData?.companyLogo.startsWith("http")
                      ? profileData?.companyLogo
                      : getImageUrl(profileData?.companyLogo)
                  }
                  alt="Company Logo"
                  width={120}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="mt-2 text-center">
              <label htmlFor="companyLogo" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">
                  Click to replace
                </span>
                <span className="text-gray-600"> or drag and drop</span>
              </label>
              <input
                id="companyLogo"
                type="file"
                className="hidden"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={handleFileChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              SVG, PNG, JPG or GIF (max. 400 x 400px)
            </p>
          </Card>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label
            htmlFor="companyName"
            className="text-lg font-medium text-gray-90"
          >
            Company Name
          </Label>
          <Input
            id="companyName"
            placeholder="Hair Stylist"
            {...register("companyName")}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
          />
        </div>

        {/* Company Description */}
        <div className="space-y-2">
          <Label
            htmlFor="companyDescription"
            className="text-lg font-medium text-gray-90"
          >
            Company Descriptions
          </Label>
          <Textarea
            id="companyDescription"
            placeholder="Company companyDescriptions"
            {...register("companyDescription")}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px]"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-90">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="companyEmail"
                className="text-lg font-medium text-gray-90"
              >
                Email Address
              </Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="example@gmail.com"
                {...register("companyEmail")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-lg font-medium text-gray-90"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="0000 0000 0000"
                {...register("phone")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="companyWebsite"
                className="text-lg font-medium text-gray-90"
              >
                Website
              </Label>
              <Input
                id="companyWebsite"
                placeholder="https://example.com"
                {...register("companyWebsite")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-lg font-medium text-gray-90"
              >
                Location
              </Label>
              <Input
                id="location"
                placeholder="London"
                {...register("location")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-90">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="linkedinProfile"
                className="text-lg font-medium text-gray-90"
              >
                Linkedin
              </Label>
              <Input
                id="linkedinProfile"
                placeholder="https://example.com"
                {...register("linkedinProfile")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="twitterProfile"
                className="text-lg font-medium text-gray-90"
              >
                Twitter
              </Label>
              <Input
                id="twitterProfile"
                placeholder="https://example.com"
                {...register("twitterProfile")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="facebookProfile"
                className="text-lg font-medium text-gray-90"
              >
                Facebook
              </Label>
              <Input
                id="facebookProfile"
                placeholder="https://example.com"
                {...register("facebookProfile")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="instagramProfile"
                className="text-lg font-medium text-gray-90"
              >
                Instagram
              </Label>
              <Input
                id="instagramProfile"
                placeholder="https://example.com"
                {...register("instagramProfile")}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-5 bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg"
        >
          Save Change
        </Button>
      </form>
    </div>
  );
}
