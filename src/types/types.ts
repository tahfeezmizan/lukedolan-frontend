import { LucideIcon } from "lucide-react";
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
    _id: string;
    applicant: string;
    author: {
        companyName: string;
    };
    companyName: string;
    createdAt: Date;
    updatedAt: string;
    email: string;
    experience: number;
    job: {
        _id: string;
        title: string;
    };
    location: string;
    name: string;
    phone: string;
    resume: string;
    title: string;
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

export type StatItem = {
    title: string;
    value: string;
    icon: LucideIcon;
};

export type UserData = {
    _id: string;
    name: string;
    email: string;
    role: "applicant" | "recruiter";
    status: "active" | "restricted" | string;
    companyName?: string | null;
    subscribe?: boolean;
    createdAt: string;
    updatedAt: string;
    profile?: string;
    roleProfile?: string;
    image?: string | null;
};

export type CompanyData = {
    recruiterId: string;
    recruiterName: string;
    companyName: string;
    jobPosted: number;
    renewalDate: string;
    paymentStatus: string;
};

export interface PostJobFormData {
    _id?: number | string | undefined;
    title: string;
    category?: string;
    type: "Full-time" | "Remote" | "Freelance";
    startDate: Date;
    endDate: Date;
    minSalary: number;
    maxSalary: number;
    description?: string;
    responsibilities?: string;
    jobLocation: string;
    applicationsCount: string;
    experianceLabel: "Experienced" | "Beginner" | "Freshers";
    user: {
        email: string;
        image: string | null;
        name: string;
        profile: {
            _id: string;
            companyName: string;
            companyLogo: string | null;
        };
        role: string;
        roleProfile: string;
    };
}

export type Column<T> = {
    key: keyof T;
    label: string;
};

export type JobData = {
    userId: string;
    jobTitle: string;
    companyName: string;
    salary: string;
    jobType: string;
    applications: number;
};

export type JobApplyFormInputs = {
    name: string;
    email: string;
    phone: string;
    location: string;
    experience: number;
    resume: FileList;
};

export interface ApiError {
    data?: {
        message: string;
    };
}
