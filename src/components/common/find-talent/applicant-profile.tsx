"use client";

import CreateChatModal from "@/components/profile/createChatModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/utils";
import { useGetSingleTalentQuery } from "@/redux/features/talentApi";
import {
  Briefcase,
  CircleUserRound,
  Download,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ApplicantResume } from "./applicant-resume";

export default function ApplicantProfile() {
  const { id }: { id: string } = useParams();
  const { data: talent } = useGetSingleTalentQuery(id);

  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const resumeUrl = `${baseUrl}/${talent?.profile?.resume}`;

  console.log("talent", talent);

  return (
    <section className=" px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 ">
          {/* Left Column - Profile Card */}
          <div className="col-auto md:col-span-1 bg-white p-6 rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto shadow-lg ">
                  {talent?.image ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={getImageUrl(talent?.image)}
                      alt={talent?.name ?? "User"}
                      className="w-32 h-32 object-cover "
                    />
                  ) : (
                    <CircleUserRound className="h-32 w-32 object-cover" />
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {talent?.name}
              </h3>
              <p className="text-gray-600 font-medium">
                {talent?.profile?.expartes &&
                talent?.profile?.expartes?.length > 0
                  ? talent?.profile?.expartes?.join(", ")
                  : "No expartes listed"}
              </p>
              <div className="mt-4">
                {talent?.profile?.openToWork === true ? (
                  <span className="bg-green-900 text-white text-lg font-semibold px-4 py-1.5 rounded-full">
                    Open to work
                  </span>
                ) : (
                  "NOt Avaible"
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Contact
              </h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() =>
                    (window.location.href = `mailto:${talent?.email}`)
                  }
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>

                <CreateChatModal myId={id} />
              </div>
            </div>

            {/* Languages */}
            {talent?.profile?.languages?.length > 0 ? (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Languages
                </h4>
                <ul className="space-y-2">
                  {talent?.profile?.languages &&
                  talent?.profile?.languages?.length > 0
                    ? talent?.profile?.languages?.join(", ")
                    : "No skills listed"}
                </ul>
              </div>
            ) : (
              ""
            )}

            {/* Bio */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Bio</h4>
              <p className="text-gray-700 leading-relaxed text-justify text-sm">
                {talent?.profile?.bio}
              </p>
            </div>

            {/* Salary Expectations */}
            {talent?.profile?.salaryExpectation ? (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Salary Expectations
                </h4>
                <p className="text-2xl font-bold text-gray-900">
                  {talent?.profile?.salaryExpectation &&
                  talent?.profile?.salaryExpectation?.length > 0
                    ? talent?.profile?.salaryExpectation?.join(", ")
                    : "No skills listed"}
                </p>
              </div>
            ) : (
              ""
            )}

            {/* Skills */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h4>
              <ul className="space-y-2">
                {talent?.profile?.skills && talent?.profile?.skills?.length > 0
                  ? talent?.profile?.skills?.map((skill: string) => (
                      <Badge variant={"outline"} className="mx-0.5">
                        {skill}
                      </Badge>
                    ))
                  : "NO Expectations"}
              </ul>
            </div>
          </div>

          {/* Right Column - Resume/CV */}
          <div className="col-span-2 space-y-6 bg-white p-8 rounded-lg overflow-hidden">
            <ApplicantResume data={talent} />
          </div>
        </div>
      </div>
    </section>
  );
}
