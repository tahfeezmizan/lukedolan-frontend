import Table from "@/components/shared/table";

const appliedJobs = [
  {
    id: 1,
    jobTitle: "Senior Hair Stylist",
    company: "Glamour Hair Studio",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 2,
    jobTitle: "Senior Hair Stylist",
    company: "Luxe Beauty Salon",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 3,
    jobTitle: "Senior Hair Stylist",
    company: "Luxe Beauty Salon",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 4,
    jobTitle: "Senior Hair Stylist",
    company: "Luxe Beauty Salon",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 5,
    jobTitle: "Senior Hair Stylist",
    company: "Sparkle Nail Bar",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 6,
    jobTitle: "Senior Hair Stylist",
    company: "Sparkle Nail Bar",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
  {
    id: 7,
    jobTitle: "Senior Hair Stylist",
    company: "Shine Hair & Co.",
    location: "London",
    appliedDate: "07/07/2025",
    expires: "07/07/2025",
    action: "Company Details",
  },
];

export default function page() {
  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

      <table className="w-full bg-white">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Job Title
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Company / Recruiter
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Location
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Applied Date
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Expires
            </th>
            <th className="text-left py-4 px-6 font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <Table appliedJobs={appliedJobs} />
      </table>
    </div>
  );
}
