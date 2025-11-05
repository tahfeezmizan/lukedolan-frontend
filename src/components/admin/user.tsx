// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Column, UserData, StatItem } from "@/types/types";
// import { Calendar, Users } from "lucide-react";
// import { StatsCard } from "../shared/stats-card";
// import AdminTable from "./table";
// import { useGetAllUserQuery } from "@/redux/features/userApi";
// import { useState, useMemo } from "react";
// import LoadingSpinner from "@/lib/loading-spinner";

// const columns: Column<UserData>[] = [
//   { key: "_id", label: "Serial Id" },
//   { key: "name", label: "Name" },
//   { key: "email", label: "Email" },
//   { key: "role", label: "Role" },
//   { key: "status", label: "Status" },
//   { key: "companyName", label: "Company" },
//   { key: "createdAt", label: "Joined At" },
//   { key: "action", label: "Action" },
// ];

// export default function User() {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading } = useGetAllUserQuery({ page, limit });

//   const users = data?.data?.users || [];
//   const meta = data?.data?.meta;
//   const staticData = data?.data?.staticData;

//   // Generate stats dynamically
//   const stats: StatItem[] = useMemo(() => {
//     return [
//       {
//         title: "Total Users",
//         value: staticData?.totalUsers?.toLocaleString() || "0",
//         icon: Calendar,
//       },
//       {
//         title: "Job Seekers",
//         value: staticData?.totalApplicants?.toLocaleString() || "0",
//         icon: Users,
//       },
//       {
//         title: "Total Recruiters",
//         value: staticData?.totalRecruiters?.toLocaleString() || "0",
//         icon: Calendar,
//       },
//     ];
//   }, [staticData]);

//   const usersWithSerial = users.map((user: any, index: number) => ({
//     ...user,
//     _id: (page - 1) * limit + index + 1,
//   }));

//   return (
//     <div>
//       <StatsCard stats={stats} />

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <AdminTable
//           data={usersWithSerial}
//           columns={columns}
//           pagination={{
//             page: meta?.page || 1,
//             totalPages: meta?.totalPage || 1,
//             onPageChange: setPage,
//           }}
//         />
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column, UserData, StatItem } from "@/types/types";
import { Calendar, Users, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import AdminTable from "./table";
import { useGetAllUserQuery } from "@/redux/features/userApi";
import { useState, useMemo } from "react";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const columns: Column<UserData>[] = [
  { key: "_id", label: "Serial Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "companyName", label: "Company" },
  { key: "createdAt", label: "Joined At" },
  { key: "action", label: "Action" },
];

export default function User() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllUserQuery({ page, limit });

  const users = data?.data?.users || [];
  const meta = data?.data?.meta;
  const staticData = data?.data?.staticData;

  const handleView = (userId: string) => {
    console.log("View user:", userId);
  };

  const handleDelete = (userId: string) => {
    console.log("Delete user:", userId);
  };

  // Generate stats dynamically
  const stats: StatItem[] = useMemo(() => {
    return [
      {
        title: "Total Users",
        value: staticData?.totalUsers?.toLocaleString() || "0",
        icon: Calendar,
      },
      {
        title: "Job Seekers",
        value: staticData?.totalApplicants?.toLocaleString() || "0",
        icon: Users,
      },
      {
        title: "Total Recruiters",
        value: staticData?.totalRecruiters?.toLocaleString() || "0",
        icon: Calendar,
      },
    ];
  }, [staticData]);

  const usersWithSerial = users.map((user: UserData, index: number) => ({
    ...user,
    _id: (page - 1) * limit + index + 1,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    action: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleView(user._id)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(user._id)}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }));

  return (
    <div>
      <StatsCard stats={stats} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AdminTable
          data={usersWithSerial}
          columns={columns}
          pagination={{
            page: meta?.page || 1,
            totalPages: meta?.totalPage || 1,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
}
