"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

export default function RevenueChart() {
  return (
    <Card className="bg-white shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="pr-0">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "#6366F1",
            },
          }}
          className="h-96 !w-full"
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
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
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
  );
}
