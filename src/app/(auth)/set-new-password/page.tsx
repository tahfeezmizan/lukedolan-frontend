import { AuthLayout } from "@/components/auth/auth-layout";
import SetNewPasswordForm from "@/components/auth/forgot-password-form";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import React from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SetNewPasswordForm />
      </AuthLayout>
    </div>
  );
}
