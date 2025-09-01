"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function SidebarFilter() {
  return (
    <div className="w-80 p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
        <button className="text-sm text-red-500 hover:text-red-600">
          Clear All
        </button>
      </div>

      {/* Category Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Category</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Anytime" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anytime">Anytime</SelectItem>
            <SelectItem value="last-24-hours">Last 24 hours</SelectItem>
            <SelectItem value="last-week">Last week</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Job Type Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="full-time" />
            <label
              htmlFor="full-time"
              className="text-sm font-medium leading-none"
            >
              Full time
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="part-time" />
            <label
              htmlFor="part-time"
              className="text-sm font-medium leading-none"
            >
              Part time
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="contract" />
            <label
              htmlFor="contract"
              className="text-sm font-medium leading-none"
            >
              Contract
            </label>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Salary Range Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Salary Range</h3>
        <Slider
          defaultValue={[0, 150]}
          max={200}
          step={1}
          min={0}
          className="w-full"
        />
        <div className="flex space-x-4">
          <Input type="number" placeholder="0" className="w-1/2" />
          <Input type="number" placeholder="150" className="w-1/2" />
        </div>
      </div>
    </div>
  );
}
