"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export function SignupForm() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    // const formData = { ...data, role };
    // console.log("Selected role:", formData);

    try {
      const res = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res?.data?.success === true) {
        route.push(
          `/otp-verify?email=${encodeURIComponent(
            data.email
          )}&authType=createAccount`
        );
        console.log("Created");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    // console.log("Form data:", data);
  };

  return (
    <div className="space-y-6">
      {/* Custom role switch */}

      <div className="space-y-1 text-center">
        <h1 className="!text-3xl font-semibold tracking-tight">Sign up</h1>
      </div>

      {/* <div className="flex justify-center mb-4">
        <div className="flex  !rounded-lg overflow-hidden">
          <Button
            type="button"
            onClick={() => setRole("applicant")}
            className={`px-6 py-2 font-medium transition-colors !rounded-none hover:bg-green-500 hover:text-white ${
              role === "applicant"
                ? "bg-green-200 text-green-900"
                : "bg-white text-gray-700"
            }`}
          >
            Job Seeker
          </Button>
          <Button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`px-6 py-2 font-medium transition-colors !rounded-none hover:bg-green-500 hover:text-white ${
              role === "recruiter"
                ? "bg-green-200 text-green-900"
                : "bg-white text-gray-700"
            }`}
          >
            Company
          </Button>
        </div>
      </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="fullName" className="text-lg">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John"
            className="p-5 rounded-lg !text-lg text-black"
            {...register("name", { required: "First name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-lg">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="p-5 rounded-lg !text-lg text-black"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* {role === "recruiter" && (
          <div className="space-y-1">
            <Label htmlFor="companyName" className="text-lg">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter your company name"
              className="p-5 rounded-lg !text-lg text-black"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>
        )} */}

        <div className="space-y-1 relative">
          <Label htmlFor="password" className="text-lg">
            Password
          </Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="p-5 rounded-lg !text-lg text-black"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 bg-transparent hover:bg-transparent text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1 relative">
          <Label htmlFor="confirmPassword" className="text-lg">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="p-5 rounded-lg !text-lg text-black"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 bg-transparent hover:bg-transparent text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            {...register("agreeToTerms", {
              required: "You must agree to the terms",
            })}
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            I have read and agree to roqit&apos;s Terms and conditions
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
        )}

        <Button
          type="submit"
          disabled={!watch("agreeToTerms")}
          className="w-full mt-4 bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-xl font-medium rounded-lg"
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Sign up"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-base text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-green-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
