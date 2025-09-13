"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import heroBg from "@/assets/talent-hero-img.png";
import { Search } from "lucide-react";

export default function FindTalentHero() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Newsletter subscription:", search);
    // Handle newsletter subscription logic here
    setSearch("");
  };
  return (
    <section
      className="bg-[#414652] pb-20 px-4  pt-40"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white text-balance">
            Top Talent Ready to Work
          </h2>
          <p className="text-gray-200 text-md md:text-2xl font-normal px-0 lg:px-40 leading-snug">
            Discover verified professionals who are open for work right now.
            Browse their profiles, check ratings, and connect instantly.
          </p>

          {/* Right side - Email form */}
          <div className="w-full lg:w-5xl mx-auto bg-white overflow-hidden rounded-md mt-8">
            <form onSubmit={handleSubmit} className="flex ">
              <Input
                type="email"
                placeholder="Search applicants"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
                className="border-none outline-none rounded-none pl-4 py-8 !text-xl"
              />
              <Button
                type="submit"
                className="bg-green-900 text-lg px-6 py-8 text-white flex items-center hover:bg-green-700 font-medium rounded-none "
              >
                <Search />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
