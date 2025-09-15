"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onGetStarted: () => void;
}

export function PricingCard({
  title,
  price,
  features,
  onGetStarted,
}: PricingCardProps) {
  return (
    <Card className="flex flex-col py-12 px-5  bg-white !rounded-md border-none shadow-none  group hover:bg-[#E7EFEC] duration-300">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </CardTitle>
        <div className="text-3xl font-bold text-gray-900">{price}</div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div className="flex-1 flex items-center">
          <ul className="space-y-4 w-full">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 font-medium !text-lg"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-[#0066FF] rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Link href={"/"}>
          <Button
            onClick={onGetStarted}
            className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300 "
          >
            Get Started
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
