"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      console.log("✅ Google login success. Token:", token);
      // You can also store it in localStorage or a cookie:
      // localStorage.setItem("token", token);
    }

    if (error) {
      console.error("❌ Google login error:", error);
    }
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Processing login...</h1>
      <p>Please wait while we complete the login process.</p>
    </div>
  );
}
