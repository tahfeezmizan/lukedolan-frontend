import person from "@/assets/telent-person.png";
import { Talent } from "@/types/talentTypes";
import { Briefcase, CheckCircle, PoundSterling, Scissors } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TalentCards({ talent }: { talent: Talent }) {
  const {
    userId,
    email,
    name,
    role,
    status,
    verified,
    age,
    bio,
    citizenship,
    city,
    country,
    dateOfBirth,
    gender,
    maritalStatus,
    landLine,
    mobile,
    openToWork,
    salaryExpectation,
  } = talent;

  console.log(talent);

  return (
    <div
      key={talent?._id}
      className="bg-white rounded-lg overflow-hidden border border-gray-200  "
    >
      <Link href={`/find-talent/${talent?._id}`}>
        <div className="p-4 bg-gray-100 space-y-3 relative">
          {openToWork === true ? (
            <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs font-bold text-gray-700">
                Available For work
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="flex justify-center mt-8">
            <div className="relative">
              <Image
                src={talent?.userId?.image || person}
                alt={talent?.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <p className="text-base font-medium text-gray-600 text-center leading-relaxed">
            {talent?.expartes && talent?.expartes?.length > 0 ? (
              talent?.expartes?.map((s, i) => (
                <span key={i}>
                  {s}
                  {i < talent?.expartes?.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span>Not Provided</span>
            )}
          </p>
        </div>

        <div className="p-5 ">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {talent?.userId?.name || "Luke Dolan"}
          </h3>

          {/* Details */}
          <div className="space-y-4">
            {/* Experience */}
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                5 years experience
              </span>
            </div>

            {/* Skills */}
            <div className="flex items-center gap-4 ">
              <Scissors className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                Skills:{" "}
                {talent?.skills && talent?.skills?.length > 0 ? (
                  talent?.skills?.map((s, i) => (
                    <span key={i}>
                      {s}
                      {i < talent?.skills?.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>Not Provided</span>
                )}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <PoundSterling className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg font-semibold text-gray-900">
                {salaryExpectation || "1000"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
