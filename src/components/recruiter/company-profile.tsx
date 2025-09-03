"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from "lucide-react";

interface CompanyData {
  companyName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo?: string;
}

// Sample company data - in a real app, this would come from a database or API
const sampleCompanyData: CompanyData = {
  companyName: "Luxe Beauty Salon",
  description:
    "We are a premier beauty salon dedicated to providing exceptional hair styling, beauty treatments, and wellness services. Our team of experienced professionals uses the latest techniques and high-quality products to ensure every client leaves feeling confident and beautiful.",
  email: "contact@luxebeauty.com",
  phone: "+44 20 7123 4567",
  website: "https://luxebeauty.com",
  location: "London, UK",
  linkedin: "https://linkedin.com/company/luxe-beauty-salon",
  twitter: "https://twitter.com/luxebeauty",
  facebook: "https://facebook.com/luxebeautysalon",
  instagram: "https://instagram.com/luxebeauty",
};

export function CompanyProfile() {
  return (
    <div className="space-y-6">
      {/* Company Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">
                {sampleCompanyData.companyName}
              </CardTitle>
              <Badge variant="secondary" className="mt-2">
                Active
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {sampleCompanyData.description}
          </p>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{sampleCompanyData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{sampleCompanyData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a
                  href={sampleCompanyData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  {sampleCompanyData.website}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{sampleCompanyData.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a
                  href={sampleCompanyData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  View Profile
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Twitter className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-500">Twitter</p>
                <a
                  href={sampleCompanyData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  @luxebeauty
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="h-5 w-5 text-blue-700" />
              <div>
                <p className="text-sm text-gray-500">Facebook</p>
                <a
                  href={sampleCompanyData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  View Page
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="h-5 w-5 text-pink-600" />
              <div>
                <p className="text-sm text-gray-500">Instagram</p>
                <a
                  href={sampleCompanyData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  @luxebeauty
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
