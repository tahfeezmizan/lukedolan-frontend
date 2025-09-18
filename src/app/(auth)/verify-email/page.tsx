import { AuthLayout } from "@/components/auth/auth-layout";
import VerifyEmail from "@/components/auth/verify-email";
import React from "react";

export default function page() {
  return (
    <div>
      {" "}
      <AuthLayout>
        <VerifyEmail />
      </AuthLayout>
    </div>
  );
}
