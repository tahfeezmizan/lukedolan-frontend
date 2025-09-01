"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  isPopular = false,
  onGetStarted,
}: PricingCardProps) {
  return (
    <Card className="relative w-full max-w-sm mx-auto bg-white shadow-sm h-full flex flex-col">
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
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={onGetStarted}
          className={`w-full ${
            isPopular
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          variant={isPopular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
