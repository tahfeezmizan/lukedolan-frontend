"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, FileText } from "lucide-react";

export default function TermsConditionsPage() {
  const [terms, setTerms] = useState("");
  const [showSuccess, setShowSuccess] = useState(true);
  const [lastUpdated] = useState("January 15, 2024");

  const handleSave = () => {
    // Handle save logic here
    setShowSuccess(true);
    console.log("Terms & Conditions saved:", terms);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Manage Terms & Conditions
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Use this section to write or update the Terms and Conditions for your
          app. These terms will be displayed to users within the app and must be
          accepted during registration or major updates.
        </p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="mb-8 border-green-200 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">
            Your Terms & Conditions have been successfully updated and will now
            appear in the app.
          </AlertDescription>
        </Alert>
      )}

      {/* Editor Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Terms & Conditions Editor
        </h2>

        <Textarea
          placeholder="Write or paste your Terms & Conditions here..."
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          className="min-h-[400px] resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
        />

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last Updated On: <span className="font-medium">{lastUpdated}</span>
          </p>

          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            <FileText className="w-4 h-4 mr-2" />
            Save Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  );
}
