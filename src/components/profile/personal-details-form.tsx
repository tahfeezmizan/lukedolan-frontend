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
import { Controller, useForm } from "react-hook-form";

interface EssentialPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  birthday: string;
  gender: string;
  address: string;
  city: string;
  country: string;
}

export function PersonalDetailsForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EssentialPersonalData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      birthday: "",
      gender: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = (data: EssentialPersonalData) => {
    console.log("Personal Details Form Data:", {
      ...data,
    });

    
  };

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
              First Name *
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName", {
                required: "First name is required",
              })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-lg font-medium text-gray-900"
            >
              Last Name *
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName", { required: "Last name is required" })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label
              htmlFor="email"
              className="text-lg font-medium text-gray-900"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="mobile"
              className="text-lg font-medium text-gray-900"
            >
              Mobile Number *
            </Label>
            <Input
              id="mobile"
              placeholder="+0000 0000 0000"
              {...register("mobile", { required: "Mobile number is required" })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label
              htmlFor="birthday"
              className="text-lg font-medium text-gray-900"
            >
              Date of Birth *
            </Label>
            <Input
              id="birthday"
              type="date"
              {...register("birthday", {
                required: "Date of birth is required",
              })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.birthday && (
              <p className="text-red-500 text-sm">{errors.birthday.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="gender"
              className="text-lg font-medium text-gray-900"
            >
              Gender *
            </Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="address"
              className="text-lg font-medium text-gray-900"
            >
              Street Address *
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              {...register("address", { required: "Address is required" })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="city"
                className="text-lg font-medium text-gray-900"
              >
                City *
              </Label>
              <Input
                id="city"
                placeholder="General Trias"
                {...register("city", { required: "City is required" })}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="country"
                className="text-lg font-medium text-gray-900"
              >
                Country *
              </Label>
              <Input
                id="country"
                placeholder="Philippines"
                {...register("country", { required: "Country is required" })}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-sm"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
