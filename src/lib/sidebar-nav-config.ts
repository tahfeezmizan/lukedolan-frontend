import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LucideIcon,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";

// Individual sidebar item
export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

// Roles type (optional but useful for role-based logic)
export type DashboardRole = "admin" | "recruiter" | "applicant";

// Sidebar arrays type
export type SidebarItems = SidebarItem[];

// Applicant sidebar items
export const applicantItems: SidebarItems = [
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/profile/messages",
  },
  {
    icon: FileText,
    label: "Applied Jobs",
    href: "/profile/applied-jobs",
  },
  // {
  //   icon: User,
  //   label: "Overview",
  //   href: "/recruiter/overview",
  // },
];

// Recruiter sidebar items
export const recruiterItems: SidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/recruiter",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    href: "/recruiter/job-post",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/recruiter/messages",
  },
  {
    icon: FileText,
    label: "Applications",
    href: "/recruiter/applications",
  },
  // {
  //   icon: User,
  //   label: "Overview",
  //   href: "/recruiter/overview",
  // },
];

// Admin sidebar items
export const adminItems: SidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/admin/messages",
  },
  {
    icon: User,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    href: "/admin/jobs",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];
