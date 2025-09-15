import type React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto p-6">
      {/* Decorative elements */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gray-100 rounded-full blur-xl opacity-70"></div>

        {/* Decorative circles and plus signs */}
        <div className="absolute top-0 left-1/4 w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-gray-200 opacity-80"></div>
        <div className="absolute bottom-1/4 left-0 w-3 h-3 rounded-full bg-gray-200 opacity-80"></div>

        <div className="absolute top-0 right-1/3 text-gray-300 text-xl">+</div>
        <div className="absolute bottom-1/3 right-1/4 text-gray-300 text-xl">
          +
        </div>

        {/* Envelope container with shadow */}
        <div className="relative bg-white p-5 rounded-2xl shadow-lg">
          {icon}
        </div>
      </div>

      {/* Text content */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
