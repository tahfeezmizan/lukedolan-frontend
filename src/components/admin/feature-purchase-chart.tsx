"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Feature purchase data for pie chart
const featurePurchaseData = [
  { name: "Geo-Boost", value: 32, color: "#FF715B" },
  { name: "Featured Job Ad", value: 45, color: "#34D196" },
  { name: "Urgent Badge", value: 40, color: "#6610F2" },
];

export default function FeaturePurchaseChart() {
  return (
    <Card className="bg-white shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Feature Purchase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="relative flex items-center justify-center h-80">
            <ChartContainer
              config={{
                geoBoost: {
                  label: "Geo-Boost",
                  color: "#FF715B",
                },
                featuredJobAd: {
                  label: "Featured Job Ad",
                  color: "#34D196",
                },
                urgentBadge: {
                  label: "Urgent Badge",
                  color: "#6610F2",
                },
              }}
              className="h-auto max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featurePurchaseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={98}
                    outerRadius={125}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {featurePurchaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Center overlay inside PieChart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3986</div>
                <div className="text-sm text-gray-500">Total Purchase</div>
              </div>
            </div>
          </div>

          {/* Legend badges */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            <span className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#34D196]">
              Urgent Badge
            </span>
            <span className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#6610F2]">
              Featured Job Ad
            </span>
            <span className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#FF715B]">
              Geo-Boost
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
