import { ApplicationsList } from "@/components/recruiter/applications-list";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Applications</h2>
      </div>
      <ApplicationsList />
    </div>
  );
}
