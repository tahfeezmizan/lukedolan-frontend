"use client";

import { Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const applications = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior Hair Stylist",
    location: "San Francisco, CA",
    appliedOn: "April 15, 2025",
    experience: "5 years",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "John Doe",
    position: "Senior Hair Stylist",
    location: "San Francisco, CA",
    appliedOn: "April 15, 2025",
    experience: "5 years",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: 3,
    name: "John Doe",
    position: "Senior Hair Stylist",
    location: "San Francisco, CA",
    appliedOn: "April 15, 2025",
    experience: "5 years",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
];

export function ApplicationsList() {
  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <div
          key={application.id}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            {/* Left side - Profile info */}
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  width={52}
                  height={52}
                  src={application.avatar}
                  alt={application.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile details */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {application.name}
                </h3>
                <p className="text-gray-700 font-medium">
                  {application.position}
                </p>
                <p className="text-gray-600">{application.location}</p>
              </div>
            </div>

            {/* Right side - Application details */}
            <div className="text-right space-y-1">
              <p className="text-sm text-gray-600">
                Applied On: {application.appliedOn}
              </p>
              <p className="text-sm text-gray-600">
                Experience: {application.experience}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
