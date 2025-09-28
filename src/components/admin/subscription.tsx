// import { AlertTriangle, CheckCircle, Users } from "lucide-react";
// import { PricingCard } from "../common/pricing/pricing-card";
// import { StatsCard } from "../shared/stats-card";

// const stats = [
//     {
//         title: "Expired",
//         value: "40,689",
//         icon: Users,
//     },
//     {
//         title: "Active",
//         value: "3,689 ",
//         icon: CheckCircle,
//     },
//     {
//         title: "Failed Subscriptions",
//         value: "14,154",
//         icon: AlertTriangle,
//     },
// ];
// const pricingPlans = [
//     {
//         title: "Starter",
//         price: "(Free)",
//         features: ["1 Free Job Post / Month", "Basic Job Filters"],
//         isPopular: false,
//     },
//     {
//         title: "Pro",
//         price: "£ 10 / Monthly",
//         features: ["Unlimited Job Posts", "Freelance, Part-Time, Apprenticeship & Guest Spot Options", "Candidate Applications Direct to Your Inbox"],
//         isPopular: true,
//     },
//     {
//         title: "Business",
//         price: "£ 99 / Yearly",
//         features: ["Unlimited Job Posts", "Priority Placement in Search Results", "Monthly Insights on Your Job Reach"],
//         isPopular: false,
//     },
// ];

// export default function Subscription() {
//     return (
//         <div>
//             <StatsCard stats={stats} />

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//                 {pricingPlans.map((plan, index) => (
//                     <PricingCard key={index} title={plan.title} price={plan.price} features={plan.features} isPopular={plan.isPopular} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// "use client";

// import { PricingCard } from "../common/pricing/pricing-card";
// import { StatsCard } from "../shared/stats-card";
// import { AlertTriangle, CheckCircle, Users } from "lucide-react";
// import { useGetPlansQuery } from "@/redux/features/planApi";
// import { Button } from "../ui/button";

// export default function Subscription() {
//     const { data: plansData, isLoading } = useGetPlansQuery();

//     // Keep your stats the same (static) or adapt if you want dynamic counts
//     const stats = [
//         { title: "Expired", value: "40,689", icon: Users },
//         { title: "Active", value: "3,689", icon: CheckCircle },
//         { title: "Failed Subscriptions", value: "14,154", icon: AlertTriangle },
//     ];

//     console.log(plansData);
//     return (
//         <div>
//             <StatsCard stats={stats} />

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{isLoading ? <p>Loading plans...</p> : plansData?.map((plan) => <PricingCard key={plan._id} _id={plan._id} title={plan.title} price={plan.price ?? 0} duration={plan.duration} features={plan.features ?? []} />)}</div>
//             <div className="mt-10">
//                 <Button className=" px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 text-white group-hover:text-white bg-green-900 duration-300">Create Plan</Button>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { PricingCard } from "../common/pricing/pricing-card";
import { StatsCard } from "../shared/stats-card";
import { AlertTriangle, CheckCircle, Users } from "lucide-react";
import { useGetPlansQuery, useCreatePlanMutation } from "@/redux/features/planApi";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";

export default function Subscription() {
    const { data: plansData, isLoading, refetch } = useGetPlansQuery();
    const [createPlan] = useCreatePlanMutation();
    type DurationType = "1 month" | "3 months" | "6 months" | "1 year";

    // Form state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState<number | "">("");
    const [newDuration, setNewDuration] = useState<"1 month" | "3 months" | "6 months" | "1 year">("1 month");
    const [newFeatures, setNewFeatures] = useState("");

    // Stats (static, keep your original design)
    const stats = [
        { title: "Expired", value: "40,689", icon: Users },
        { title: "Active", value: "3,689", icon: CheckCircle },
        { title: "Failed Subscriptions", value: "14,154", icon: AlertTriangle },
    ];

    // Determine paymentType dynamically
    const getPaymentType = (duration: string) => (duration === "1 year" || duration === "6 months" ? "Yearly" : "Monthly");

    const handleCreatePlan = async () => {
        if (!newTitle.trim()) return Swal.fire("Error", "Plan title is required", "error");
        if (!newDescription.trim()) return Swal.fire("Error", "Description is required", "error");

        // Close the modal first
        setIsCreateModalOpen(false);

        try {
            await createPlan({
                title: newTitle,
                description: newDescription,
                price: Number(newPrice),
                duration: newDuration,
                paymentType: getPaymentType(newDuration),
                features: newFeatures.split("\n").filter((f) => f.trim() !== ""),
                status: "Active",
            }).unwrap();

            Swal.fire("Success", "Plan created successfully", "success");

            // Reset form
            setNewTitle("");
            setNewDescription("");
            setNewPrice("");
            setNewDuration("1 month");
            setNewFeatures("");

            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to create plan", "error");
        }
    };

    return (
        <div className="space-y-10">
            <StatsCard stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{isLoading ? <p>Loading plans...</p> : plansData?.map((plan) => <PricingCard key={plan._id} _id={plan._id} title={plan.title} price={plan.price ?? 0} duration={plan.duration} features={plan.features ?? []} />)}</div>

            {/* Create Plan Modal */}
            <div className="mt-10 flex justify-center">
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 text-white bg-green-900 hover:bg-green-800 duration-300">Create Plan</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Create New Plan</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Plan Title</Label>
                                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" rows={3} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price (£)</Label>
                                <Input id="price" type="number" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Select value={newDuration} onValueChange={(val) => setNewDuration(val as DurationType)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1 month">1 Month</SelectItem>
                                        <SelectItem value="3 months">3 Months</SelectItem>
                                        <SelectItem value="6 months">6 Months</SelectItem>
                                        <SelectItem value="1 year">1 Year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="features">Features (one per line)</Label>
                                <Textarea id="features" rows={6} value={newFeatures} onChange={(e) => setNewFeatures(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => {}}>
                                Cancel
                            </Button>
                            <Button className="bg-green-900 hover:bg-green-800" onClick={handleCreatePlan}>
                                Create
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
