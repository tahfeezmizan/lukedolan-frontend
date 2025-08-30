import { Navbar } from "@/components/shared/header/navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute top-0 lg:top-12 left-0 w-full z-50 ">
        <Navbar />
      </div>
      {children}

      
    </div>
  );
}
