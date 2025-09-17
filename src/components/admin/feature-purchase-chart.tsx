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
  { name: "Geo-Boost", value: 32, color: "#FF8A65" },
  { name: "Featured Job Ad", value: 45, color: "#7C4DFF" },
  { name: "Urgent Badge", value: 23, color: "#4CAF50" },
];

export default function FeaturePurchaseChart() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Feature Purchase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <ChartContainer
            config={{
              geoBoost: {
                label: "Geo-Boost",
                color: "#FF8A65",
              },
              featuredJobAd: {
                label: "Featured Job Ad",
                color: "#7C4DFF",
              },
              urgentBadge: {
                label: "Urgent Badge",
                color: "#4CAF50",
              },
            }}
            className="h-[300px] max-w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={featurePurchaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
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

          {/* Center text */}
          <div className=" flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">3986</div>
              <div className="text-sm text-gray-500">Total Purchase</div>
            </div>
          </div>

          {/* Legend badges */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Urgent Badge
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Featured Job Ad
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              Geo-Boost
            </span>
          </div>

          {/* Percentage indicator */}
          <div className="mt-4 text-right w-full">
            <span className="text-sm font-medium text-gray-600">32%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
