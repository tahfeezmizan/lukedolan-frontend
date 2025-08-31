"use client";

import { Button } from "@/components/ui/button";
import { Menu, Rocket, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../../public/logo.png";
import { usePathname } from "next/navigation";

export function Navbar() {
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();

  // Navigation links data
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/job", label: "Jobs" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact Us" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log("Search input data:", value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchValue("");
    }
  };

  return (
    <nav className="text-white relative">
      <div
        className={`${
          pathname === "/"
            ? "absolute top-0 lg:top-12 left-0"
            : "absolute top-0"
        } w-full z-50`}
      >
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 py-2 rounded-md bg-white/10 backdrop-blur-[5px] ">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="Logo"
                  width={165}
                  height={40}
                  className="w-40 h-11"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div
              className={`hidden lg:flex items-center space-x-8 ${
                pathname === "/" ? "text-white" : "text-black"
              }`}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3  text-xl font-normal"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section - Search & Login */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isSearchOpen && (
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:none transition-all"
                    autoFocus
                  />
                )}
                <button
                  onClick={toggleSearch}
                  className="p-2  hover:text-gray-700 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              <Button className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none">
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2  transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-white hover:bg-green-900 px-3 py-2 text-base font-normal transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Search & Login */}
                <div className="px-3 pt-4 border-t border-gray-200">
                  {isSearchOpen && (
                    <div className="mb-4">
                      <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full px-3 py-2 border rounded-md text-sm focus:none nt"
                        autoFocus
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleSearch}
                      className="p-2 transition-colors"
                    >
                      <Search className="h-5 w-5 " />
                    </button>
                    <Button className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-none">
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
