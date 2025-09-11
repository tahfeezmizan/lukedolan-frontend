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
