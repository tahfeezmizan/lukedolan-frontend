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
import { MapPin, Search } from "lucide-react";

export function SidebarFilter() {
  return (
    <div className="w-full p-6 bg-white rounded-lg  space-y-4">
      <div className="flex justify-between items-center text-xl border-b">
        <h2 className="font-semibold text-gray-800 leading-relaxed">Filter</h2>
        <button className="text-red-500 hover:text-red-600 leading-relaxed">
          Clear All
        </button>
      </div>

      <div className=" space-y-3">
        <h3 className="text-lg font-medium text-black">Search</h3>
        <div className=" relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            className="pl-10 pr-4 py-2 w-full rounded-none !text-md text-black"
          />
        </div>

        <div className=" relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="pl-10 pr-4 py-2 w-full rounded-none !text-md text-black">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="florence">Florence, Italy</SelectItem>
              <SelectItem value="london">London, UK</SelectItem>
              <SelectItem value="new-york">New York, USA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Category Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Category</h3>
        <Select>
          <SelectTrigger className="mt-1 p-4 rounded-none !text-md text-black w-full ">
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
        <h3 className="text-lg font-medium text-black">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="full-time" />
            <label
              htmlFor="full-time"
              className="text-md font-medium leading-none"
            >
              Full time
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="part-time" />
            <label
              htmlFor="part-time"
              className="text-md font-medium leading-none"
            >
              Part time
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="contract" />
            <label
              htmlFor="contract"
              className="text-md font-medium leading-none"
            >
              Contract
            </label>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Salary Range Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">Salary Range</h3>
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
