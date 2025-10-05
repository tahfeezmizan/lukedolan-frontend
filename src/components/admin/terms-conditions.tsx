/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

import dynamic from "next/dynamic";
import { toast } from "sonner";
import { TermsData, useCreateTermsMutation, useGetTermsQuery } from "@/redux/features/termsApi";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TermsEditor() {
    const editor = useRef<any>(null);
    const [terms, setTerms] = useState<string>("");
    const [lastUpdated, setLastUpdated] = useState<string>("");

    // Fetch terms from API
    const { data } = useGetTermsQuery();
    const [createTerms, { isLoading: isSaving }] = useCreateTermsMutation();

    useEffect(() => {
        if (data) {
            setTerms(data.content || "");
            setLastUpdated(data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "");
        }
    }, [data]);

    const handleSave = async () => {
        try {
            const payload: TermsData = {
                content: terms,
                type: "terms-and-condition",
            };
            const res = await createTerms(payload).unwrap();
            setLastUpdated(res.updatedAt ? new Date(res.updatedAt).toLocaleDateString() : new Date().toLocaleDateString());
            toast.success("Terms & Conditions saved successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save Terms & Conditions.");
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Terms & Conditions Editor</h2>

            <JoditEditor
                ref={editor}
                value={terms}
                onChange={(newContent) => setTerms(newContent)}
                config={{
                    readonly: false,
                    height: 600,
                    toolbarButtonSize: "middle",
                }}
            />

            {/* Footer Info */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    Last Updated On: <span className="font-medium">{lastUpdated}</span>
                </p>

                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2" disabled={isSaving}>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Terms & Conditions
                </Button>
            </div>
        </div>
    );
}
