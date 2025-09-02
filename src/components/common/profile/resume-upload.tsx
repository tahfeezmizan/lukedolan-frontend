"use client";

import type React from "react";

import { useState } from "react";
import { FileText } from "lucide-react";

export function ResumeUpload() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    "Upload Your Resume here"
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Resume uploaded:", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: new Date(file.lastModified),
      });
      setUploadedFile(file.name);
    }
  };

  const handleRemoveResume = () => {
    console.log("Resume removed");
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Upload instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload your recent resume or CV
          </h2>
          <p className="text-gray-600">Upload your most up-to-date resume</p>
          <p className="text-sm text-gray-500">
            File types: DOC, DOCX, PDF, TXT
          </p>
        </div>

        {/* Right side - Current file and upload area */}
        <div className="space-y-4">
          {uploadedFile && (
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{uploadedFile}</p>
            </div>
          )}

          {/* Upload area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="text-blue-600 font-medium hover:text-blue-800">
                    Upload new file
                  </span>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".doc,.docx,.pdf,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {uploadedFile && (
            <button
              onClick={handleRemoveResume}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Remove your resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
