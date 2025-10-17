"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/features/userApi";
import Image from "next/image";
import { PageLoading } from "../shared/page-loading";
import { CircleUserRound } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export function TopNavbar() {
  const { data, isLoading } = useGetMeQuery(undefined);

  console.log(data)

  console.log("Active user", data);

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
            <div className="w-12 h-12 rounded-full overflow-hidden border-2">
              {data?.profile?.companyLogo || data?.image ? (
                <Image
                  width={1000}
                  height={1000}
                  src={getImageUrl(data?.profile?.companyLogo || data?.image)}
                  alt={data?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUserRound className="size-11" />
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
