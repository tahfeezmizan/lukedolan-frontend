"use client";

import { cn } from "@/lib/utils";
import { useUpdateProfileMutation } from "@/redux/features/userApi";
import Image from "next/image";
import { useState } from "react";

export default function ProfileSection() {
 const [status, setStatus] = useState<"open" | "not">("open");
 const [preview, setPreview] = useState<string | null>(null);
 const [file, setFile] = useState<File | null>(null);

 const [updateProfile, { isLoading }] = useUpdateProfileMutation();

 // Handle file upload and show preview
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const selectedFile = e.target.files?.[0];
   if (selectedFile) {
     const imageUrl = URL.createObjectURL(selectedFile);
     setPreview(imageUrl);
     setFile(selectedFile);

     console.log("Selected File:", selectedFile);
     console.log("Preview URL:", imageUrl);
   }
 };

 // Submit to API
 const handleSubmit = async () => {
   if (!file) {
     alert("Please select a file first!");
     return;
   }

   const formData = new FormData();
   formData.append("image", file); // backend key অনুযায়ী নাম দিন
   formData.append("status", status);

   try {
     const res = await updateProfile({ body: formData }).unwrap();
     console.log("Profile updated successfully:", res);
   } catch (err) {
     console.error("Update profile failed:", err);
   }
 };


  return (
    <div className="flex flex-col items-center space-y-8">

      <button onClick={handleSubmit}>Update Profile</button>
      {/* Availability Switch */}
      <div className="flex items-center rounded-full bg-gray-100 p-1 w-[300px] justify-between">
        <button
          onClick={() => {
            setStatus("open");
            console.log("Status:", "open");
          }}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            status === "open"
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          Open to work
        </button>
        <button
          onClick={() => {
            setStatus("not");
            console.log("Status:", "not");
          }}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            status === "not"
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          Not available
        </button>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <Image
              width={24}
              height={24}
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-12 h-12 text-green-800"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.7-9.8 4.9V22h19.6v-2.7c0-3.2-6.5-4.9-9.8-4.9z" />
            </svg>
          )}
        </div>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-1 border border-green-700 rounded text-green-800 text-sm cursor-pointer hover:bg-green-50"
        >
          Choose File
        </label>
      </div>
    </div>
  );
}
