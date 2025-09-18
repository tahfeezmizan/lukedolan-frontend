import { AuthLayout } from "@/components/auth/auth-layout";
import OtpVerify from "@/components/auth/otp-verify";
import React from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <OtpVerify />
      </AuthLayout>
    </div>
  );
}
