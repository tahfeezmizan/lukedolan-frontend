import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Settings,
  User,
} from "lucide-react";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const recruiterItems = [
  {
    icon: User,
    label: "Profile",
    href: "/recruiter",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    href: "/recruiter/job-post",
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

export const adminItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
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
