import { AuthLayout } from "@/components/auth/auth-layout";
import SelectRolePage from "@/components/auth/select-role";
import React from "react";

export default function page() {
  return (
    <div>
      <AuthLayout>
        <SelectRolePage />
      </AuthLayout>
    </div>
  );
}
