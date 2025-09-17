import { Card, CardContent } from "@/components/ui/card";
import { StatItem } from "@/types/types";

export function StatsCard({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white shadow-none border-none">
          <CardContent className="px-6 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 !text-green-900" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
