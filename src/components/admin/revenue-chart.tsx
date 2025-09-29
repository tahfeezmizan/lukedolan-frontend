"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface MonthlyRevenue {
    monthName: string;
    revenue: number;
}

interface RevenueChartProps {
    monthlyRevenue: MonthlyRevenue[];
    onYearChange?: (year: number) => void;
}

export default function RevenueChart({ monthlyRevenue, onYearChange }: RevenueChartProps) {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);

    // Generate array of years: current year ±5
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    const handleYearChange = (value: string) => {
        const selectedYear = Number(value);
        setYear(selectedYear);
        if (onYearChange) onYearChange(selectedYear);
    };

    const data = monthlyRevenue.map((item) => ({
        month: item.monthName,
        revenue: item.revenue,
    }));

    return (
        <Card className="bg-white shadow-none border-none">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Revenue - {year}</CardTitle>
                <Select value={year.toString()} onValueChange={handleYearChange}>
                    <SelectTrigger className="w-24">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((y) => (
                            <SelectItem key={y} value={y.toString()}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="pr-0">
                <ChartContainer config={{ revenue: { label: "Revenue", color: "#6366F1" } }} className="h-96 !w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                            <YAxis hide />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} fill="url(#revenueGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
