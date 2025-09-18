import React from "react";
import { Button } from "../ui/button";

export default function VerifyEmail() {
  return (
    <div className="space-y-5 text-center">
      <h2 className="text-3xl font-semibold ">Verify email </h2>

      <p>Don’t get the verification email to </p>

      <Button
        type="submit"
        className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg"
      >
        Reset email
      </Button>
    </div>
  );
}
