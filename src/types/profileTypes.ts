export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  experience: string;
}

export interface Education {
  degreeTitle: string;
  instituteName: string;
  major: string;
  scale: string;
  duration: string;
  yearOfPassing: string;
  cgpa: string;
}

export interface Profile {
  age: string | null;
  bio: string | null;
  citizenship: string | null;
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  education: Education[];
  firstName: string;
  gender: string;
  landLine: string | null;
  languages: string[];
  lastName: string;
  maritalStatus: string | null;
  mobile: string;
  openToWork: boolean;
  preferredWorkType: string | null;
  previousEmployment: string | null;
  province: string | null;
  resume: string;
  salaryExpectation: string | null;
  skills: string[];
  expartes: string[];

  streetAddress: string;
  updatedAt: string;
  userId: string;
  workExperience: WorkExperience[];
  zipCode: string | null;
  _id: string;
  __v: number;
}

export interface UserData {
  companyName: string;
  createdAt: string;
  email: string;
  image: string;
  name: string;
  profile?: Profile;
  role: string;
  roleProfile: string;
  status: string;
  subscribe: boolean;
  updatedAt: string;
  verified: boolean;
  __v: number;
  _id: string;
}

export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserData;
}
