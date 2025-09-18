"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

export default function CompanyProfile() {
  const [responsibilities, setResponsibilities] = useState([
    "Community engagement to ensure that is supported and actively represented online",
    "Focus on social media content development and publication",
    "Marketing and strategy support",
    "Stay on top of trends on social media platforms, and suggest content ideas to the team",
    "Engage with online communities",
  ]);

  setResponsibilities;

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving company profile...");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Company Profile</h1>

      {/* Company Logo */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">m</span>
        </div>
      </div>

      {/* Company Name */}
      <div className="mb-8 space-y-1">
        <h3 className="text-xl font-semibold">Company Name</h3>
        <p className="text-lg ">Hair Stylist</p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="block text-xl font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p>
          Stripe is looking for Social Media Marketing expert to help manage our
          online networks. You will be responsible for monitoring our social
          media channels, creating content, finding effective ways to engage the
          community and incentivize others to engage on our channels.
        </p>
      </div>

      {/* Responsibilities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Responsibilities
        </h2>
        <div className="space-y-3">
          {responsibilities.map((responsibility, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {responsibility}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full bg-green-900 hover:bg-green-800 rounded-lg text-white py-3 text-base font-medium"
      >
        Save Change
      </Button>
    </div>
  );
}
