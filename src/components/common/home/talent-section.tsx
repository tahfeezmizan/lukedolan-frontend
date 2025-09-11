import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Scissors,
  PoundSterling,
} from "lucide-react";
import Image from "next/image";
import person from "@/assets/telent-person.png";
import Link from "next/link";

export function TalentSection() {
  const talents = [
    {
      id: 1,
      name: "Sophia R.",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
    {
      id: 2,
      name: "John Doe",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
    {
      id: 3,
      name: "Sophia R.",
      title: "Senior Hair Stylist | Color Specialist | Blow Dry Expert",
      experience: "5+ years salon experience",
      skills: "Hair Coloring, Bridal Styling, Extensions",
      price: "15,000",
      image: person,
    },
  ];

  return (
    <section className="bg-[#EBF1FA] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold ">
            Top Talent Ready to Work
          </h2>
          <Link
            href={"/job"}
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-none duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white border overflow-hidden border-gray-200 shadow"
            >
              <div className="p-4 bg-gray-100 space-y-3 relative">
                <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-bold text-gray-700">
                    Available For work
                  </span>
                </div>

                <div className="flex justify-center mt-8">
                  <div className="relative">
                    <Image
                      src={talent.image || "/placeholder.svg"}
                      alt={talent.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-base font-medium text-gray-600 text-center leading-relaxed">
                  {talent.title}
                </p>
              </div>

              <div className="p-5 ">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {talent.name}
                </h3>

                {/* Details */}
                <div className="space-y-4">
                  {/* Experience */}
                  <div className="flex items-center gap-4">
                    <Briefcase className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
                    <span className="text-lg leading-tight text-gray-700">
                      {talent.experience}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex items-center gap-4 ">
                    <Scissors className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
                    <span className="text-lg leading-tight text-gray-700">
                      Skills: {talent.skills}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4">
                    <PoundSterling className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
                    <span className="text-lg font-semibold text-gray-900">
                      {talent.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
