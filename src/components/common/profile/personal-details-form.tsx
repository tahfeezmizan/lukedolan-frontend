"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalDetailsData {
  lastName: string;
  firstName: string;
  middleName: string;
  preferredName: string;
  gender: string;
  maritalStatus: string;
  citizenship: string;
  birthday: string;
  age: string;
  previousEmployee: string;
  completeAddress: string;
  cityMunicipality: string;
  province: string;
  zipPostalCode: string;
  country: string;
  mobile: string;
  landline: string;
  emergencyMobile: string;
  emergencyLandline: string;
  emergencyRelationship: string;
}

export function PersonalDetailsForm() {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    lastName: "",
    firstName: "",
    middleName: "",
    preferredName: "",
    gender: "",
    maritalStatus: "",
    citizenship: "",
    birthday: "",
    age: "",
    previousEmployee: "",
    completeAddress: "",
    cityMunicipality: "",
    province: "",
    zipPostalCode: "",
    country: "",
    mobile: "",
    landline: "",
    emergencyMobile: "",
    emergencyLandline: "",
    emergencyRelationship: "",
  });

  const handleInputChange = (
    field: keyof PersonalDetailsData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Personal Details Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="mt-1"
              placeholder="Doe"
            />
          </div>
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="mt-1"
              placeholder="John"
            />
          </div>
          <div>
            <Label
              htmlFor="middleName"
              className="text-sm font-medium text-gray-700"
            >
              Middle Name
            </Label>
            <Input
              id="middleName"
              value={formData.middleName}
              onChange={(e) => handleInputChange("middleName", e.target.value)}
              className="mt-1"
              placeholder="N/A"
            />
          </div>
          <div>
            <Label
              htmlFor="preferredName"
              className="text-sm font-medium text-gray-700"
            >
              Preferred Name
            </Label>
            <Input
              id="preferredName"
              value={formData.preferredName}
              onChange={(e) =>
                handleInputChange("preferredName", e.target.value)
              }
              className="mt-1"
              placeholder="Joe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700"
            >
              Gender
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Male" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="maritalStatus"
              className="text-sm font-medium text-gray-700"
            >
              Marital Status
            </Label>
            <Select
              value={formData.maritalStatus}
              onValueChange={(value) =>
                handleInputChange("maritalStatus", value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Single" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="citizenship"
              className="text-sm font-medium text-gray-700"
            >
              Citizenship
            </Label>
            <Input
              id="citizenship"
              value={formData.citizenship}
              onChange={(e) => handleInputChange("citizenship", e.target.value)}
              className="mt-1"
              placeholder="Philippines"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label
              htmlFor="birthday"
              className="text-sm font-medium text-gray-700"
            >
              Birthday
            </Label>
            <Input
              id="birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => handleInputChange("birthday", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-sm font-medium text-gray-700">
              Age
            </Label>
            <Input
              id="age"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className="mt-1"
              placeholder="27 Years"
            />
          </div>
          <div>
            <Label
              htmlFor="previousEmployee"
              className="text-sm font-medium text-gray-700"
            >
              Have you been a previous employee?
            </Label>
            <Select
              value={formData.previousEmployee}
              onValueChange={(value) =>
                handleInputChange("previousEmployee", value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="completeAddress"
              className="text-sm font-medium text-gray-700"
            >
              Complete Address
            </Label>
            <Input
              id="completeAddress"
              value={formData.completeAddress}
              onChange={(e) =>
                handleInputChange("completeAddress", e.target.value)
              }
              className="mt-1"
              placeholder="BLK208 L26 Manchester Street, Grand Broadmore, Antel Grand Village"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label
                htmlFor="cityMunicipality"
                className="text-sm font-medium text-gray-700"
              >
                City / Municipality
              </Label>
              <Input
                id="cityMunicipality"
                value={formData.cityMunicipality}
                onChange={(e) =>
                  handleInputChange("cityMunicipality", e.target.value)
                }
                className="mt-1"
                placeholder="General Trias"
              />
            </div>
            <div>
              <Label
                htmlFor="province"
                className="text-sm font-medium text-gray-700"
              >
                Province
              </Label>
              <Input
                id="province"
                value={formData.province}
                onChange={(e) => handleInputChange("province", e.target.value)}
                className="mt-1"
                placeholder="Cavite"
              />
            </div>
            <div>
              <Label
                htmlFor="zipPostalCode"
                className="text-sm font-medium text-gray-700"
              >
                Zip/Postal Code
              </Label>
              <Input
                id="zipPostalCode"
                value={formData.zipPostalCode}
                onChange={(e) =>
                  handleInputChange("zipPostalCode", e.target.value)
                }
                className="mt-1"
                placeholder="4107"
              />
            </div>
            <div>
              <Label
                htmlFor="country"
                className="text-sm font-medium text-gray-700"
              >
                Country
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="mt-1"
                placeholder="Philippines"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
              Mobile
            </Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className="mt-1"
              placeholder="+0000 0000 0000"
            />
          </div>
          <div>
            <Label
              htmlFor="landline"
              className="text-sm font-medium text-gray-700"
            >
              Landline
            </Label>
            <Input
              id="landline"
              value={formData.landline}
              onChange={(e) => handleInputChange("landline", e.target.value)}
              className="mt-1"
              placeholder="+6320 000 0000 0000"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          In case of emergency, please contact.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="emergencyMobile"
              className="text-sm font-medium text-gray-700"
            >
              Mobile
            </Label>
            <Input
              id="emergencyMobile"
              value={formData.emergencyMobile}
              onChange={(e) =>
                handleInputChange("emergencyMobile", e.target.value)
              }
              className="mt-1"
              placeholder="+0000 0000 0000"
            />
          </div>
          <div>
            <Label
              htmlFor="emergencyLandline"
              className="text-sm font-medium text-gray-700"
            >
              Landline
            </Label>
            <Input
              id="emergencyLandline"
              value={formData.emergencyLandline}
              onChange={(e) =>
                handleInputChange("emergencyLandline", e.target.value)
              }
              className="mt-1"
              placeholder="+0000 0000 0000"
            />
          </div>
          <div>
            <Label
              htmlFor="emergencyRelationship"
              className="text-sm font-medium text-gray-700"
            >
              Relationship
            </Label>
            <Input
              id="emergencyRelationship"
              value={formData.emergencyRelationship}
              onChange={(e) =>
                handleInputChange("emergencyRelationship", e.target.value)
              }
              className="mt-1"
              placeholder="Spouse"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
