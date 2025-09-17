"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  isPopular?: boolean
  onGetStarted?: () => void
}

export function PricingCard({ title, price, features, onGetStarted }: PricingCardProps) {
  const pathName = usePathname()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    title,
    price,
    features: features.join("\n"),
  })

  const handleSaveChanges = () => {
    // Here you would typically call an API to update the pricing plan
    console.log("Saving changes:", editData)
    setIsEditModalOpen(false)
    // Call onGetStarted if provided for additional handling
    onGetStarted?.()
  }

  return (
    <Card className="flex flex-col py-12 px-5  bg-white !rounded-md border-none shadow-none  group hover:bg-[#E7EFEC] duration-300">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{title}</CardTitle>
        <div className="text-3xl font-bold text-gray-900">{price}</div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div className="flex-1 flex items-center">
          <ul className="space-y-4 w-full">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 font-medium !text-lg">
                <div className="flex-shrink-0 w-2 h-2 bg-[#0066FF] rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {pathName === "/admin/subscription" ? (
          <div className="space-y-4">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Pricing Plan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Plan Title</Label>
                    <Input
                      id="title"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="features">Features (one per line)</Label>
                    <Textarea
                      id="features"
                      rows={6}
                      value={editData.features}
                      onChange={(e) => setEditData({ ...editData, features: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={onGetStarted}
              className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300 "
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link href={"/"}>
            <Button
              onClick={onGetStarted}
              className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300 "
            >
              Get Started
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
