"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description?: string;
  companyName: string;
  status: "Active" | "Inactive";
}

export default function CatagoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [open, setOpen] = useState(false);

  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Hair Stylist",
      companyName: "Style & Cut Saloon",
      status: "Active",
    },
    {
      id: 2,
      name: "Beaty Saloon",
      companyName: "Style & Cut Saloon",
      status: "Active",
    },
    {
      id: 3,
      name: "Creative",
      companyName: "Style & Cut Saloon",
      status: "Active",
    },
  ]);

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      console.log("Adding category:", { categoryName, categoryDescription });
      setCategoryName("");
      setCategoryDescription("");
      setOpen(false); // close dialog
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <div className="space-y-8">
        {/* Add New Category Section */}
        <div className="flex justify-between items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-fit bg-transparent shadow-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category Name</label>
                  <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="border p-2 py-1 rounded-lg font-medium">
            Total Category: 10
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    SL NO
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.companyName}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          category.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          category.status === "Active"
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {category.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
