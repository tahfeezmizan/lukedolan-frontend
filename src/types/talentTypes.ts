export interface Education {
  degree?: string;
  institution?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
}

export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  startDate: string; // ISO string
  endDate?: string | null; // may be ongoing
  description?: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: "applicant" | "employer" | string;
  status: "active" | "inactive" | string;
  verified: boolean;
  image: string | null;
}

export interface Talent {
  _id: string;
  userId?: User; // sometimes missing in payload
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: "applicant" | "employer" | string;
  status: "active" | "inactive" | string;
  verified: boolean;

  // profile info
  age: number | null;
  bio: string | null;
  citizenship: string | null;
  gender: string;
  maritalStatus: string | null;
  dateOfBirth: string | null;

  // contact info
  city: string;
  country: string;
  province: string | null;
  streetAddress: string;
  zipCode: string | null;
  landLine: string | null;
  mobile: string;

  // employment info
  openToWork: boolean;
  preferredWorkType: string | null;
  previousEmployment: string | null;
  salaryExpectation: number | null;

  // files & media
  resume: string | null;
  image: string | null;
  companyLogo?: string | null;

  // arrays
  skills: string[];
  expartes: string[];
  languages: string[];
  education: Education[];
  workExperience: WorkExperience[];

  // system
  createdAt: string;
  updatedAt: string;
}
