"use client";

import logo from "@/assets/logo.png";
import mainLogo from "@/assets/mian-logo.png";
import whiteLogo from "@/assets/white-logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import { removeUser, setUser } from "@/redux/slice/userSlice";
import {
  Bell,
  CircleUserRound,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Types for user roles
type UserRole = "guest" | "applicant" | "recruiter";

interface User {
  role: UserRole;
  name?: string;
  avatar?: string;
}

export function Navbar() {
  const { data: user } = useGetMeQuery(undefined);
  const activeRole = user?.role;

  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // State for scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links based on user role
  const getNavigationLinks = (userRole: UserRole) => {
    switch (userRole) {
      case "applicant":
        return [
          { href: "/", label: "Home" },
          { href: "/job", label: "Search Job" },
          { href: "/contact", label: "Contact Us" },
        ];
      case "recruiter":
        return [
          { href: "/", label: "Home" },
          { href: "/job", label: "Jobs" },
          { href: "/find-talent", label: "Find Talent" },
          { href: "/pricing", label: "Pricing" },
          { href: "/contact", label: "Contact Us" },
        ];
      default: // guest
        return [
          { href: "/", label: "Home" },
          { href: "/find-talent", label: "Find Talent" },

          { href: "/job", label: "Search Job" },
          // { href: "/pricing", label: "Pricing" },
          { href: "/contact", label: "Contact Us" },
        ];
    }
  };

  const navigationLinks = getNavigationLinks(activeRole || "guest");

  const handleLogout = () => {
    setUser(null);
    dispatch(removeUser());
    router.push("/");

    console.log("User logged out");
  };

  const handleMessage = () => {
    console.log("Message clicked");
  };

  const handleNotification = () => {
    console.log("Notification clicked");
  };

  return (
    <nav className="text-white relative">
      <div
        className={cn(
          "fixed top-0 w-full z-50 transition-colors duration-400",
          pathname === "/" && "lg:top-12 left-0",
          pathname === "/" && isScrolled && "bg-[#EBF1FA] !top-0 border-b",
          pathname !== "/" && "bg-[#EBF1FA] border-b"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 rounded-md bg-white/10 backdrop-blur-[5px]">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Link href={"/"}>
                {pathname === "/" ? (
                  isScrolled ? (
                    <Image
                      src={mainLogo}
                      alt="Logo"
                      width={165}
                      height={40}
                      className="w-40 h-auto"
                    />
                  ) : (
                    <Image
                      src={whiteLogo}
                      alt="Logo"
                      width={165}
                      height={40}
                      className="w-40 h-auto"
                    />
                  )
                ) : (
                  <Image
                    src={logo}
                    alt="Logo"
                    width={165}
                    height={40}
                    className="w-40 h-auto"
                  />
                )}
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div
              className={cn(
                "hidden lg:flex items-center space-x-3",
                pathname === "/" ? "text-white" : "text-green-900",
                pathname === "/" && isScrolled && "text-green-900"
              )}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 font-medium text-xl "
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section - Based on User Role */}
            <div className="hidden lg:flex items-center space-x-4">
              {user &&
              (activeRole === "applicant" ||
                activeRole === "recruiter" ||
                activeRole === "admin") ? (
                // Authenticated Users (Applicant or Recruiter)
                <>
                  {/* Message Icon */}
                  <button
                    onClick={handleMessage}
                    className={cn(
                      "p-2 rounded-full hover:bg-white/10 transition-colors",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </button>

                  {/* Notification Icon */}
                  <button
                    onClick={handleNotification}
                    className={cn(
                      "p-2 rounded-full hover:bg-white/10 transition-colors",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                  >
                    <Bell className="h-6 w-6" />
                  </button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center">
                          {user?.profile?.companyLogo || user?.image ? (
                            <Image
                              src={getImageUrl(
                                user?.profile?.companyLogo || user?.image
                              )}
                              alt={user?.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            // <User  />
                            <CircleUserRound className="h-6 w-6 text-white" />
                          )}
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <span className="text-xl font-semibold">
                          {user?.name}
                        </span>
                      </DropdownMenuItem>
                      {/* applicant dropdonw menu */}
                      {activeRole === "applicant" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile"
                              className="flex items-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      {/* recruiter dropdown menu */}
                      {activeRole === "recruiter" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter/jobs/post-job"
                              className="flex items-center space-x-2"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Create Job</span>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter/jobs"
                              className="flex items-center space-x-2"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Job List</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      {activeRole === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin/jobs"
                              className="flex items-center space-x-2"
                            >
                              <Plus className="h-4 w-4" />
                              <span>All Jobs</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin/users"
                              className="flex items-center space-x-2"
                            >
                              <FileText className="h-4 w-4" />
                              <span>All Users</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                // Guest Users - Login and Sign Up
                <div className="flex items-center space-x-3">
                  <Link href={"/login"}>
                    <Button
                      variant="outline"
                      className={cn(
                        "px-6 py-2 text-base font-medium rounded-lg border-2 cursor-pointer",
                        pathname === "/"
                          ? "border-green-900 bg-transparent text-white hover:bg-white hover:border-white hover:text-black"
                          : "border-green-900 text-black hover:bg-green-900 hover:text-white",
                        pathname === "/" && isScrolled && "text-green-900 "
                      )}
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href={"/sing-up"}>
                    <Button className="bg-green-900 hover:bg-green-800 text-white px-6 py-2 text-base font-medium rounded-lg cursor-pointer">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              {user &&
              (activeRole === "applicant" ||
                activeRole === "recruiter" ||
                activeRole === "admin") ? (
                // Authenticated Users (Applicant or Recruiter)
                <>
                  {/* Message Icon */}
                  <Button
                    onClick={handleMessage}
                    className={cn(
                      "p-2 rounded-full hover:bg-white/10 transition-colors bg-transparent",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                  >
                    <Link href={"/recruiter/messages"}>
                      <MessageCircle className="h-6 w-6" />
                    </Link>
                  </Button>

                  {/* Notification Icon */}
                  <Button
                    onClick={handleNotification}
                    className={cn(
                      "p-2 rounded-full hover:bg-white/10 transition-colors bg-transparent",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                  >
                    <Link href={"/"}>
                      <Bell className="h-6 w-6" />
                    </Link>
                  </Button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center">
                          {user?.image ? (
                            <Image
                              src={getImageUrl(user?.image)}
                              alt="Profile"
                              width={30}
                              height={30}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <User className="h-6 w-6 text-white" />
                          )}
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {activeRole === "applicant" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile"
                              className="flex items-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      {activeRole === "recruiter" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter/jobs/post-job"
                              className="flex items-center space-x-2"
                            >
                              <Plus className="h-4 w-4" />
                              <span>Create Job</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/recruiter/jobs"
                              className="flex items-center space-x-2"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Job List</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      {activeRole === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin"
                              className="flex items-center space-x-2"
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin/jobs"
                              className="flex items-center space-x-2"
                            >
                              <Plus className="h-4 w-4" />
                              <span>All Jobs</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin/users"
                              className="flex items-center space-x-2"
                            >
                              <FileText className="h-4 w-4" />
                              <span>All Users</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                // Guest Users - Login and Sign Up
                ""
              )}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={`h-8 w-8  ${
                      pathname === "/" ? "text-white" : "text-white"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`h-8 w-8  !bg-transparent ${
                      pathname === "/" ? "text-white " : ""
                    }`}
                  />
                )}
              </Button>
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
                    className={cn(
                      "px-3 py-2 text-base font-semibold transition-colors",
                      pathname === "/" ? "text-white" : "text-black",
                      pathname === "/" && isScrolled && "text-green-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Right Section */}
                <div className="px-3 pt-4 border-t border-gray-200">
                  {user &&
                  (activeRole === "applicant" || activeRole === "recruiter") ? (
                    ""
                  ) : (
                    // Mobile - Guest Users
                    <div className="flex flex-col space-y-3">
                      <Link
                        href={"/login"}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className={`w-full px-6 py-2 text-base font-medium rounded-lg border-2 ${
                            pathname === "/"
                              ? "border-white bg-transparent text-white hover:bg-white hover:text-black"
                              : "border-black text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link
                        href={"/sign-up"}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-green-900 hover:bg-green-800 text-white px-6 py-2 text-base font-medium rounded-lg">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
