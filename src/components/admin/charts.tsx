"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Revenue data for line chart
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 7500 },
  { month: "Jul", revenue: 6500 },
  { month: "Aug", revenue: 5800 },
  { month: "Sep", revenue: 6200 },
  { month: "Oct", revenue: 5500 },
  { month: "Nov", revenue: 7000 },
  { month: "Dec", revenue: 8000 },
];

// Feature purchase data for pie chart
const featurePurchaseData = [
  { name: "Geo-Boost", value: 32, color: "#FF8A65" },
  { name: "Featured Job Ad", value: 45, color: "#7C4DFF" },
  { name: "Urgent Badge", value: 23, color: "#4CAF50" },
];

const totalPurchases =
  featurePurchaseData.reduce((sum, item) => sum + item.value, 0) * 39.86; // Scale to match 3986

export default function Charts() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Line Chart */}
          <Card className="bg-white ">
            <CardHeader className="">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Revenue
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 text-sm font-medium">
                  ↗ (+5) more in 2025
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#6366F1",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366F1"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Feature Purchase Pie Chart */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Feature Purchase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
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
                  className="h-[300px] w-full"
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
                {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">3986</div>
                    <div className="text-sm text-gray-500">Total Purchase</div>
                  </div>
                </div> */}

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
        </div>
      </div>
    </div>
  );
}
