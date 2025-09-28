"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface CompanyFormData {
  companyName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo: File | null;
}

export function CompanyProfileForm() {
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    logo: null,
  });

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company Profile Data:", formData);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-gray-90">
            Company Logo
          </Label>
          <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">
                    Click to replace
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </div>
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
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
          />
        </div>

        {/* Company Description */}
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-90"
          >
            Company Descriptions
          </Label>
          <Textarea
            id="description"
            placeholder="Company descriptions"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
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
                htmlFor="email"
                className="text-lg font-medium text-gray-90"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="website"
                className="text-lg font-medium text-gray-90"
              >
                Website
              </Label>
              <Input
                id="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
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
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
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
                htmlFor="linkedin"
                className="text-lg font-medium text-gray-90"
              >
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="https://example.com"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="twitter"
                className="text-lg font-medium text-gray-90"
              >
                Twitter
              </Label>
              <Input
                id="twitter"
                placeholder="0000 0000 0000"
                value={formData.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="facebook"
                className="text-lg font-medium text-gray-90"
              >
                Facebook
              </Label>
              <Input
                id="facebook"
                placeholder="https://example.com"
                value={formData.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className="mt-1 p-4 rounded-lg !text-lg text-black w-full"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="instagram"
                className="text-lg font-medium text-gray-90"
              >
                Instagram
              </Label>
              <Input
                id="instagram"
                placeholder=""
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
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
