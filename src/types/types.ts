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