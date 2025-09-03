import { Footer } from "@/components/shared/footer/footer";
import { Navbar } from "@/components/shared/header/navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
