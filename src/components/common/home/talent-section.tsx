import person from "@/assets/telent-person.png";
import TalentCards from "@/components/shared/talent-cards";
import { ArrowRight } from "lucide-react";
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
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Talent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.map((talent) => (
            <TalentCards key={talent.id} talent={talent} />
          ))}
        </div>
      </div>
    </section>
  );
}
