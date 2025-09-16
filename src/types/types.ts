import { StaticImageData } from "next/image";

// types/job.ts
export type JobCardProps = {
  id: number;
  companyLogo: StaticImageData; // or ReactNode if using SVG imports
  experienceLevel: string;
  daysLeft: string;
  companyName: string;
  jobTitle: string;
  salary?: string;
  location?: string;
};

export interface TalentProps {
  id: number;
  name: string;
  title: string;
  experience: string;
  skills: string;
  price: string;
  image: string | StaticImageData; // if you're using Next.js `Image` import
}

export interface AppliedJob {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string; // could also use Date if you plan to parse
  expires: string; // same here
  action: string;
}

export type ApplicantJob = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  applicationDate: string; // ISO date string (e.g., "2025-09-14")
  Skills: string[];
  Action: string; // URL or route
};
