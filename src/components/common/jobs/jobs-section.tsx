import { MapPin, Search } from "lucide-react";
import JobCard from "./job-card";
import { SidebarFilter } from "./sidebar-filter";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function JobsSection() {
  const jobs = [
    {
      title: "Senior Hair Stylist",
      company: "Nova Hair Solutions",
      location: "London, UK",
      type: "Full-time",
      salary: "£40,000 – £50,000 / year",
      posted: "2 days ago",
    },
    {
      title: "Junior Hair Stylist",
      company: "Glow Salon",
      location: "Manchester, UK",
      type: "Part-time",
      salary: "£25,000 – £30,000 / year",
      posted: "1 week ago",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 pb-20">
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">
          Find Your <span className="text-green-600">Styler</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <p className="text-[#515B6F] text-base">
            Find your next career at Roqit
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 42 42"
            fill="none"
          >
            <path
              d="M41.7882 0.537512C41.7718 0.459238 41.7333 0.387194 41.677 0.329823C41.6207 0.272453 41.5491 0.232134 41.4705 0.213593C36.2291 -1.05376 24.1184 3.46252 17.557 9.94885C16.3867 11.0969 15.3198 12.3436 14.3685 13.6748C12.3451 13.4978 10.3217 13.6456 8.59727 14.389C3.7317 16.5069 2.31508 22.033 1.92043 24.4101C1.89804 24.5402 1.90648 24.6737 1.94509 24.8001C1.9837 24.9264 2.05142 25.0422 2.14293 25.1382C2.23443 25.2343 2.34723 25.3081 2.47244 25.3537C2.59766 25.3994 2.73188 25.4157 2.86454 25.4014L10.6779 24.5491C10.6835 25.1317 10.719 25.7136 10.7844 26.2926C10.8237 26.6947 11.0042 27.0704 11.2945 27.3546L14.3201 30.3398C14.6078 30.6265 14.9876 30.8049 15.394 30.8443C15.9762 30.9087 16.5613 30.9438 17.1471 30.9496L16.2898 38.667C16.2755 38.7981 16.2921 38.9308 16.3384 39.0545C16.3846 39.1783 16.4592 39.2898 16.5563 39.3802C16.6534 39.4707 16.7704 39.5376 16.898 39.5759C17.0257 39.6141 17.1606 39.6226 17.2921 39.6007C19.6913 39.2201 25.2889 37.8191 27.4179 33.0073C28.1696 31.3018 28.3235 29.3105 28.1499 27.3192C29.4993 26.3783 30.7632 25.3229 31.9273 24.165C38.5093 17.6884 43.05 5.97864 41.7882 0.537512ZM25.3605 16.4387C24.7595 15.8447 24.3501 15.0878 24.1841 14.2637C24.0182 13.4395 24.1031 12.5852 24.4281 11.8088C24.7531 11.0324 25.3037 10.3688 26.0102 9.90189C26.7166 9.43498 27.5472 9.18576 28.3969 9.18576C29.2466 9.18576 30.0772 9.43498 30.7837 9.90189C31.4901 10.3688 32.0407 11.0324 32.3657 11.8088C32.6908 12.5852 32.7757 13.4395 32.6097 14.2637C32.4437 15.0878 32.0343 15.8447 31.4333 16.4387C31.0348 16.8334 30.5615 17.1466 30.0404 17.3602C29.5194 17.5739 28.9609 17.6838 28.3969 17.6838C27.8329 17.6838 27.2744 17.5739 26.7534 17.3602C26.2324 17.1466 25.7591 16.8334 25.3605 16.4387Z"
              fill="#0F5F3E"
            />
            <path
              d="M10.7746 36.0521C10.2842 36.5578 9.49757 36.7549 8.55076 36.9235C6.42359 37.2966 4.54519 35.4045 4.92731 33.1909C5.07318 32.3517 5.50452 31.1753 5.77299 30.899C5.83168 30.8397 5.87073 30.763 5.88462 30.6796C5.89851 30.5962 5.88652 30.5104 5.85036 30.4344C5.8142 30.3585 5.75571 30.2961 5.68318 30.2563C5.61066 30.2165 5.52779 30.2012 5.44636 30.2127C4.25682 30.3625 3.15017 30.9176 2.30258 31.7897C0.198668 33.9573 0 42.0002 0 42.0002C0 42.0002 7.81784 41.7957 9.92175 39.6281C10.7716 38.7563 11.3116 37.6154 11.4547 36.3892C11.4878 36.0042 11.0323 35.7748 10.7746 36.0521Z"
              fill="#0F5F3E"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="florence">Florence, Italy</SelectItem>
              <SelectItem value="london">London, UK</SelectItem>
              <SelectItem value="new-york">New York, USA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
        <SidebarFilter />
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
