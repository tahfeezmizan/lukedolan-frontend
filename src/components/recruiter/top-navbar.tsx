"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/features/userApi";
import Image from "next/image";
import { PageLoading } from "../shared/page-loading";
import { CircleUserRound } from "lucide-react";

export function TopNavbar() {
  const { data, isLoading } = useGetMeQuery(undefined);

  // console.log("Active user", data)

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className=" h-16 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {data?.role} Panel
        </h1>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <Button
            variant="ghost"
            className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 h-auto"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {data?.image ? (
                <Image
                  width={10}
                  height={10}
                  src={data?.image}
                  alt={data?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUserRound className="size-10" />
              )}
            </div>

            <div className="flex flex-col text-start">
              <span className=" !text-lg font-semibold text-gray-900 leading-none">
                {data?.name}
              </span>
              <span className="font-semibold text-gray-900">{data?.role}</span>
            </div>
          </Button>
        </DropdownMenu>
      </div>
    </div>
  );
}
