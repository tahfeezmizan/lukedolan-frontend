"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-green-800 text-center p-8 space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-[#0F5F3E]" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">Payment Successful 🎉</h1>

                {/* Description */}
                <p className="text-gray-600">Thank you for your purchase. Your plan has been activated and you’re all set to continue!</p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* <Link href="/dashboard">
                        <Button className="bg-green-900 hover:bg-green-800 text-white w-full sm:w-auto">Go to Dashboard</Button>
                    </Link> */}
                    <Link href="/">
                        <Button variant="secondary" className="bg-transparent hover:bg-green-800 text-green-800 hover:text-white border-2 border-green-900 hover:border-green-800   w-full sm:w-auto">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
