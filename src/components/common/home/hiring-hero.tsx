"use client";
import Image from "next/image";
import React from "react";
import hiringImg from "@/assets/hiring.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetAllUserQuery } from "@/redux/features/userApi";
import CountUp from "@/lib/CountUp";

export default function HiringHero() {
    const { data, isLoading } = useGetAllUserQuery({});

    const activeUsers = data?.data?.staticData?.totalUsers || 0;
    const applicationsSubmitted = data?.data?.staticData?.totalApplicants || 0;
    // hii
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                <div className="flex-1">
                    <Image src={hiringImg.src} alt="" width={600} height={543} className="max-w-full max-h-full object-cover" />
                </div>

                <div className="flex-1 space-y-3">
                    <h2 className="text-4xl font-bold text-black leading-tight">The Smart Way to Hire</h2>
                    <p className="">Easily publish your job openings and reach a massive pool of verified candidates instantly.</p>

                    <div className="flex items-center gap-20 mb-8">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold text-gray-400">{isLoading ? "---" : <CountUp end={activeUsers} />}+</h3>
                            <p className="text-sm">Active Users</p>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold text-gray-400">{isLoading ? "---" : <CountUp end={applicationsSubmitted} />}+</h3>
                            <p className="text-sm">Job Applications Submitted</p>
                        </div>
                    </div>

                    <Link href={"/"}>
                        <Button className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg" size="lg">
                            Post a job now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
