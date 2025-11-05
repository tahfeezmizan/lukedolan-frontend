// "use client";

// import React, { useMemo, useState } from "react";
// import { StatsCard } from "../shared/stats-card";
// import { Calendar, Users } from "lucide-react";
// import { ApiUser, Column } from "@/types/types";
// import AdminTable from "./table";
// import { useGetAllUserQuery } from "@/redux/features/userApi";
// import LoadingSpinner from "@/lib/loading-spinner";

// type UserRow = {
//   serial: number;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   companyName: string | null;
//   createdAt: string;
//   action?: React.ReactNode;
// };

// const columns: Column<UserRow>[] = [
//   { key: "serial", label: "Serial No." },
//   { key: "name", label: "Name" },
//   { key: "email", label: "Email" },
//   { key: "role", label: "Role" },
//   { key: "status", label: "Status" },
//   { key: "companyName", label: "Company" },
//   { key: "createdAt", label: "Joined At" },
//   { key: "action", label: "Action" },
// ];

// export default function Company() {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading } = useGetAllUserQuery({
//     page,
//     limit,
//     role: "recruiter",
//   });

//   const users: UserRow[] = useMemo(() => {
//     if (!data?.data?.users) return [];
//     return data.data.users.map((user: ApiUser, index: number) => ({
//       serial: (page - 1) * limit + index + 1,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//       companyName: user?.companyName || null,
//       createdAt: new Date(user.createdAt).toLocaleDateString(),
//     }));
//   }, [data, page]);

//   const stats = useMemo(
//     () => [
//       {
//         title: "Total Users",
//         value: data?.data?.staticData?.totalUsers?.toLocaleString() || "0",
//         icon: Calendar,
//       },
//       {
//         title: "Job Seekers",
//         value: data?.data?.staticData?.totalApplicants?.toLocaleString() || "0",
//         icon: Users,
//       },
//       {
//         title: "Total Recruiters",
//         value: data?.data?.staticData?.totalRecruiters?.toLocaleString() || "0",
//         icon: Calendar,
//       },
//     ],
//     [data]
//   );

//   return (
//     <div>
//       <StatsCard stats={stats} />

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <AdminTable
//           data={users}
//           columns={columns}
//           pagination={{
//             page: data?.data?.meta?.page || 1,
//             totalPages: data?.data?.meta?.totalPage || 1,
//             onPageChange: setPage,
//           }}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import React, { useMemo, useState } from "react";
import { StatsCard } from "../shared/stats-card";
import { Calendar, Users, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import { ApiUser, Column } from "@/types/types";
import AdminTable from "./table";
import { useGetAllUserQuery } from "@/redux/features/userApi";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type UserRow = {
  serial: number;
  name: string;
  email: string;
  role: string;
  status: string;
  companyName: string | null;
  createdAt: string;
  action?: React.ReactNode;
};

const columns: Column<UserRow>[] = [
  { key: "serial", label: "Serial No." },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "companyName", label: "Company" },
  { key: "createdAt", label: "Joined At" },
  { key: "action", label: "Action" },
];

export default function Company() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllUserQuery({
    page,
    limit,
    role: "recruiter",
  });

  const handleView = (userId: string) => {
    console.log("View user:", userId);
  };

  const handleDelete = (userId: string) => {
    console.log("Delete user:", userId);
  };

  const users: UserRow[] = useMemo(() => {
    if (!data?.data?.users) return [];
    return data.data.users.map((user: ApiUser, index: number) => ({
      serial: (page - 1) * limit + index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      companyName: user?.companyName || null,
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
  }, [data, page]);

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: data?.data?.staticData?.totalUsers?.toLocaleString() || "0",
        icon: Calendar,
      },
      {
        title: "Job Seekers",
        value: data?.data?.staticData?.totalApplicants?.toLocaleString() || "0",
        icon: Users,
      },
      {
        title: "Total Recruiters",
        value: data?.data?.staticData?.totalRecruiters?.toLocaleString() || "0",
        icon: Calendar,
      },
    ],
    [data]
  );

  return (
    <div>
      <StatsCard stats={stats} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AdminTable
          data={users}
          columns={columns}
          pagination={{
            page: data?.data?.meta?.page || 1,
            totalPages: data?.data?.meta?.totalPage || 1,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
}
