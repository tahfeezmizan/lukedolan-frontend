"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalDetailsData>({
    defaultValues: {
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
    },
  });

  const onSubmit = (data: PersonalDetailsData) => {
    console.log("Personal Details Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information Section */}
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              {...register("lastName", { required: "Last name is required" })}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
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
              {...register("firstName", { required: "First name is required" })}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="middleName"
              className="text-lg font-medium text-gray-900"
            >
              Middle Name
            </Label>
            <Input
              id="middleName"
              placeholder="N/A"
              {...register("middleName")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
          <div>
            <Label
              htmlFor="preferredName"
              className="text-lg font-medium text-gray-900"
            >
              Preferred Name
            </Label>
            <Input
              id="preferredName"
              placeholder="Joe"
              {...register("preferredName")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                  <SelectTrigger className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200">
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
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="maritalStatus"
              className="text-lg font-medium text-gray-900"
            >
              Marital Status
            </Label>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200">
                    <SelectValue placeholder="Single" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
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
              placeholder="Philippines"
              {...register("citizenship")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label
              htmlFor="birthday"
              className="text-lg font-medium text-gray-900"
            >
              Birthday
            </Label>
            <Input
              id="birthday"
              type="date"
              {...register("birthday")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-lg font-medium text-gray-900">
              Age
            </Label>
            <Input
              id="age"
              placeholder="27 Years"
              {...register("age")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
          <div>
            <Label
              htmlFor="previousEmployee"
              className="text-lg font-medium text-gray-900"
            >
              Have you been a previous employee?
            </Label>
            <Controller
              name="previousEmployee"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200">
                    <SelectValue placeholder="No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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
              className="text-lg font-medium text-gray-900"
            >
              Complete Address
            </Label>
            <Input
              id="completeAddress"
              placeholder="BLK208 L26 ..."
              {...register("completeAddress")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              id="cityMunicipality"
              placeholder="General Trias"
              {...register("cityMunicipality")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
            <Input
              id="province"
              placeholder="Cavite"
              {...register("province")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
            <Input
              id="zipPostalCode"
              placeholder="4107"
              {...register("zipPostalCode")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
            <Input
              id="country"
              placeholder="Philippines"
              {...register("country")}
              className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="mobile"
            placeholder="+0000 0000 0000"
            {...register("mobile")}
            className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
          />
          <Input
            id="landline"
            placeholder="+6320 000 0000"
            {...register("landline")}
            className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
          />
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          In case of emergency, please contact.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="emergencyMobile"
            placeholder="+0000 0000 0000"
            {...register("emergencyMobile")}
            className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
          />
          <Input
            id="emergencyLandline"
            placeholder="+0000 0000 0000"
            {...register("emergencyLandline")}
            className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
          />
          <Input
            id="emergencyRelationship"
            placeholder="Spouse"
            {...register("emergencyRelationship")}
            className="mt-1 p-4 rounded-none !text-lg text-black w-full bg-gray-200"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
