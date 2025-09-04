"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
};

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form data:", data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Login to your account.
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-lg">
            Enter your email to reset password
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="text"
              className="p-5 rounded-none !text-xl text-black"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "email is required",
                minLength: {
                  value: 6,
                  message: "email must be at least 6 characters",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <p className="text-md">We will send an email to reset your password</p>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none"
        >
          Reset email
        </Button>
      </form>
    </div>
  );
}
