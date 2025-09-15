import EmptyState from "@/components/profile/empty-state";
import { Mail } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <main className="flex h-[750px] flex-col items-center justify-center p-4 bg-white">
        <EmptyState
          icon={<Mail className="h-12 w-12 text-gray-300" />}
          title="No new messages"
          description="You've read them all!"
        />
      </main>
    </div>
  );
}
