import React from "react";

export default function TableLoader() {
  return (
    <td colSpan={7} className="py-8 px-6 text-center">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    </td>
  );
}
