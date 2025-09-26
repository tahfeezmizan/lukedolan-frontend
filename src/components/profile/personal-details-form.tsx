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
import { useUpdateProfileMutation } from "@/redux/features/userApi";
import { Controller, useForm } from "react-hook-form";

interface EssentialPersonalData {
  firstName: string;
  lastName: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  streetAddress: string;
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
      mobile: "",
      dateOfBirth: "",
      gender: "",
      streetAddress: "",
      city: "",
      country: "",
    },
  });
  const [updateProfile, { isLoading, isError, error }] = useUpdateProfileMutation();

  const onSubmit = async(data: EssentialPersonalData) => {
    console.log("Personal Details Form Data:", {
      ...data,
    });
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    
 console.log([...formData.entries()]);

    
    try {
      const res = await updateProfile({
        body: formData 
        
      })
      console.log(res)
      if (res?.data?.success) {
        console.log("Profile updated successfully:", res.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    

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
              htmlFor="dateOfBirth"
              className="text-lg font-medium text-gray-900"
            >
              Date of Birth *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="text-lg font-medium text-gray-900"
          >
            Mobile Number *
          </Label>
          <Input
            id="mobile"
            placeholder="Mobile Number"
            {...register("mobile", { required: "Mobile number is required" })}
            className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>
      </div>

      {/* streetAddress Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Address
        </h3>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="streetAddress"
              className="text-lg font-medium text-gray-900"
            >
              Street streetAddress *
            </Label>
            <Input
              id="streetAddress"
              placeholder="123 Main Street"
              {...register("streetAddress", {
                required: "StreetAddress is required",
              })}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100"
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-sm">
                {errors.streetAddress.message}
              </p>
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
