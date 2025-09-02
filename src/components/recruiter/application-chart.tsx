"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, TrendingUp } from "lucide-react"

const chartData = [
  { day: "Sat", value: 65 },
  { day: "Sun", value: 45 },
  { day: "Mon", value: 85 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 35 },
]

export function ApplicationChart() {
  const maxValue = Math.max(...chartData.map((d) => d.value))

  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 mb-2">Application trend</CardTitle>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+2.45%</span>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            This Week
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-64 space-x-4">
          {chartData.map((item) => (
            <div key={item.day} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center mb-4">
                <div
                  className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg w-full max-w-12"
                  style={{
                    height: `${(item.value / maxValue) * 200}px`,
                    minHeight: "20px",
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
