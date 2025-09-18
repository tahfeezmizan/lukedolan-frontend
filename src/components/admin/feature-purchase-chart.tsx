"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
        <div className="relative flex items-center justify-center h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={featurePurchaseData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {featurePurchaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

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
          {featurePurchaseData.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
