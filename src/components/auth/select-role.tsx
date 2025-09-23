import React from "react";

export default function SelectRolePage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-foreground">
        Please selecte your role
      </h2>
      <div className="flex items-center gap-8 ">
        <div className="bg-white border border-green-800 p-6 rounded-lg font-semibold text-xl hover:bg-green-800 hover:text-white duration-300">
          Applicant
        </div>
        <div className="bg-white border border-green-800 p-6 rounded-lg font-semibold text-xl hover:bg-green-800 hover:text-white duration-300">
          Recruiter
        </div>
      </div>
    </div>
  );
}
