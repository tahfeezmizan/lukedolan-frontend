"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

type PortfolioFormData = {
  title: string;
  description: string;
  images: File[];
};

export default function PortfolioForm() {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<PortfolioFormData>({
      defaultValues: { images: [] },
    });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = (data: PortfolioFormData) => {
    console.log({
      title: data.title,
      description: data.description,
      images: data.images.map((file) => file),
    });
    reset();
    setPreviewImages([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentFiles = watch("images") || [];
      const updatedFiles = [...currentFiles, ...Array.from(files)];
      const previews = updatedFiles.map((file) => URL.createObjectURL(file));

      setPreviewImages(previews);
      setValue("images", updatedFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentFiles = watch("images") || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setValue("images", updatedFiles);
    setPreviewImages(updatedPreviews);
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
                      src={src}
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
            {...register("images")}
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-green-900 hover:bg-green-800 text-white px-6"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
