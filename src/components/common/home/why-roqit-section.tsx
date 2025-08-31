"use client";

import { Package, Gauge, MapPin, User } from "lucide-react";
import Image from "next/image";
import image from "../../../../public/why-roqit-img.png";

const features = [
  {
    icon: Package,
    title: "Made for Beauty & Creative Props",
    description: "Not another corporate job board.",
  },
  {
    icon: Gauge,
    title: "Fast & Affordable",
    description: "Job posts go live instantly.",
  },
  {
    icon: MapPin,
    title: "Local & Relevant",
    description: "See real roles in your area.",
  },
  {
    icon: User,
    title: "Social-Style Profiles",
    description: "Showcase skills, reviews, and photos.",
  },
];

export function WhyRoqitSection() {
  return (
    <section className="bg-white ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="mx-4 lg:ml-80  space-y-8 mt-10 lg:mt-0">
          <h2 className="pl-4 text-4xl  font-bold text-black leading-tight mb-10">
            Why Roqit?
          </h2>

          <div className="space-y-8 pl-0 md:pl-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 ">
                <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-full flex items-center justify-center ">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 ">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <Image
            src={image}
            alt="Professional barber chair in vintage salon setting"
            className="w-full h-auto object-cover"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
