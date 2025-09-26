"use client";

import { cn, getImageUrl } from "@/lib/utils";
import { useGetUserQuery } from "@/redux/features/authApi";
import { useUpdateProfileMutation } from "@/redux/features/userApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProfileSection() {
  const { data: userData, isLoading } = useGetUserQuery();
  const [openToWork, setOpenToWork] = useState<boolean>(false); 
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  //  যখন userData আসবে তখন state update করো
  useEffect(() => {
    if (userData?.data?.profile) {
      setOpenToWork(userData.data.profile.openToWork ?? false);
      setPreview(getImageUrl(userData.data.image));
    }
  }, [userData]);

  //  Update status instantly to backend
  const handleStatusChange = async (newValue: boolean) => {
    setOpenToWork(newValue);

    try {
      const res = await updateProfile({
        body: { openToWork: newValue },
      }).unwrap();

      toast.success("Status updated successfully");
      console.log("Updated in DB:", res);
    } catch (err) {
      toast.error("Failed to update status");
      console.error("Update status failed:", err);
    }
  };

  //  Handle file upload and instantly send to backend
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const res = await updateProfile({ body: formData }).unwrap();
        toast.success("Profile picture updated");
        console.log("Image uploaded:", res);
      } catch (err) {
        toast.error("Image upload failed");
        console.error("Image upload failed:", err);
      }
    }
  };

  if (isLoading) {
    return <p className="text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Availability Switch */}
      <div className="flex items-center rounded-full bg-gray-100 p-1 w-[300px] justify-between">
        <button
          onClick={() => handleStatusChange(true)}
          disabled={isUpdating}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            openToWork
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          {isUpdating && openToWork ? "Updating..." : "Open to work"}
        </button>

        <button
          onClick={() => handleStatusChange(false)}
          disabled={isUpdating}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            !openToWork
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          {isUpdating && !openToWork ? "Updating..." : "Not available"}
        </button>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <Image
              width={96}
              height={96}
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
          {isUpdating ? "Uploading..." : "Choose File"}
        </label>
      </div>
    </div>
  );
}
