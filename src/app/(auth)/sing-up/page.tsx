import { AuthLayout } from "@/components/auth/auth-layout";
import { SingupForm } from "@/components/auth/sing-up-form";

import React from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SingupForm />
      </AuthLayout>
    </div>
  );
}
