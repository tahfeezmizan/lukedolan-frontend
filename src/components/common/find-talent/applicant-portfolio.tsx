import React from "react";

export default function ApplicantPortfolio() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md"
        >
          <p className="text-gray-600 text-lg font-medium">Item {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
