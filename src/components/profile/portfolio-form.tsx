"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud, X, Trash2, Save } from "lucide-react";
import Image from "next/image";
import {
  useAddPortfolioMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { ApiResponse, Portfolio } from "@/types/profileTypes";
import { ApiError } from "@/types/types";
import { getImageUrl } from "@/lib/utils";

export default function PortfolioForm() {
  const { register, handleSubmit, reset, setValue } = useForm<Portfolio>({
    defaultValues: { images: [] },
  });

  const {
    data: userData,
    refetch,
    isLoading: isUserLoading,
  } = useGetMeQuery("");
  const [addPortfolio, { isLoading: isAddingPortfolio }] = useAddPortfolioMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  // ✅ Load user's existing portfolio data
  useEffect(() => {
    if (userData?.profile?.portfolio) {
      const portfolioList = userData.profile.portfolio.map((p: any) => ({
        title: p.title || "",
        description: p.description || "",
        images: [],
        portfolioImages: p.portfolioImages || [],
      }));
      setPortfolios(portfolioList);
    }
  }, [userData]);

  // ✅ Handle image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      // Combine with existing previews and files
      const updatedPreviews = [...previewImages, ...newPreviews];
      const updatedFiles = [...uploadedFiles, ...newFiles];

      setPreviewImages(updatedPreviews);
      setUploadedFiles(updatedFiles);
      setValue("images", updatedFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);
    setUploadedFiles(updatedFiles);
    setValue("images", updatedFiles);
  };

  // ✅ Submit handler (Add new portfolio only)
  const onSubmit = async (data: Portfolio) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => formData.append("portfolio", file));
    }

    try {
      // Add new portfolio
      const res = (await addPortfolio({ body: formData })) as {
        data?: ApiResponse;
        error?: ApiError;
      };

      if (res.data?.success) {
        toast.success("Portfolio added successfully!");

        // Refetch user data to get the updated portfolio with proper images
        await refetch();

        // Reset form
        reset();
        setPreviewImages([]);
        setUploadedFiles([]);
      } else {
        toast.error(res.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to add portfolio");
    }
  };

  // ✅ Delete portfolio
  const handleDeletePortfolio = async (index: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the portfolio permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const updatedPortfolios = [...portfolios];
        updatedPortfolios.splice(index, 1);
        setPortfolios(updatedPortfolios);

        await updateProfile({
          body: { portfolio: updatedPortfolios },
        }).unwrap();

        toast.success("Portfolio deleted successfully!");
        await refetch();
      } catch (error: any) {
        console.error("Delete portfolio error:", error);
        toast.error("Failed to delete portfolio");
      }
    }
  };

  // ✅ Save all portfolios to database
  const handleSaveAll = async () => {
    try {
      await updateProfile({ body: { portfolio: portfolios } }).unwrap();
      toast.success("All portfolio data saved successfully!");
      await refetch();
    } catch (error: any) {
      console.error("Save all portfolio error:", error);
      toast.error("Failed to save portfolio data");
    }
  };

  // ✅ Helper function to determine image source
  const getImageSource = (src: string) => {
    // If it's a blob URL (newly uploaded image), use it directly
    if (src.startsWith("blob:")) {
      return src;
    }
    // If it's already a full URL, use it as is
    if (src.startsWith("http")) {
      return src;
    }
    // If it's a stored image URL, use getImageUrl
    return getImageUrl(src);
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold text-gray-900 mb-6">Portfolio</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Image Upload */}
        <div>
          <Label htmlFor="images" className="text-lg font-medium text-gray-900">
            Upload Images
          </Label>

          <div
            className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => document.getElementById("images")?.click()}
          >
            {previewImages.length === 0 ? (
              <>
                <UploadCloud className="w-10 h-10 text-green-900 mb-2" />
                <p className="text-gray-600">Browse Files to upload</p>
              </>
            ) : (
              <div className="grid grid-cols-5 gap-3 w-full">
                {previewImages.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <Image
                      src={getImageSource(src)}
                      alt={`preview-${idx}`}
                      width={1000}
                      height={1000}
                      className="w-56 h-52 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="text-lg font-medium text-gray-900">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter portfolio title"
            className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            {...register("title", { required: true })}
          />
        </div>

        {/* Description Field */}
        <div>
          <Label
            htmlFor="description"
            className="text-lg font-medium text-gray-900"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Write a short description"
            className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none bg-gray-50"
            {...register("description", { required: true })}
          />
        </div>

        {/* Submit & Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isAddingPortfolio}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            {isAddingPortfolio ? "Adding Portfolio..." : "Add Portfolio"}
          </Button>

          <Button
            type="button"
            onClick={handleSaveAll}
            disabled={isUpdatingProfile}
            className={`bg-green-700 hover:bg-green-800 text-white px-6 ${
              isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Save className="w-4 h-4 mr-2" /> 
            {isUpdatingProfile ? "Saving All Portfolios..." : "Save All Portfolios"}
          </Button>
        </div>
      </form>

      {/* Portfolio Display List */}
      {(portfolios.length > 0 || isUserLoading) && (
        <div className="mt-8">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">
            {isUserLoading
              ? "Loading portfolio data..."
              : `Added Portfolios (${portfolios.length})`}
          </h4>

          {isUserLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolios.map((p, index) => (
                <div
                  key={`portfolio-${index}`}
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {p.title}
                      </h5>
                      <p className="text-gray-600 mb-2">{p.description}</p>
                      <div className="grid grid-cols-8 gap-3 mt-3">
                        {p.portfolioImages?.map((img, idx) => (
                          <Image
                            key={idx}
                            src={getImageUrl(img)}
                            alt={p.title}
                            width={200}
                            height={200}
                            className="w-40 h-32 object-cover rounded-md border"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeletePortfolio(index);
                        }}
                        size="sm"
                        variant="outline"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}