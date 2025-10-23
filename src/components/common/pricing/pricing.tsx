// "use client";

// import { PricingCard } from "./pricing-card";

// export default function PricingPage() {
//   const handleGetStarted = (plan: string) => {
//     console.log(`[v0] Selected plan: ${plan}`);
//   };

//   const pricingPlans = [
//     {
//       title: "Starter",
//       price: "(Free)",
//       features: ["1 Free Job Post / Month", "Basic Job Filters"],
//       isPopular: false,
//     },
//     {
//       title: "Pro",
//       price: "£ 10 / Monthly",
//       features: [
//         "Unlimited Job Posts",
//         "Freelance, Part-Time, Apprenticeship & Guest Spot Options",
//         "Candidate Applications Direct to Your Inbox",
//       ],
//       isPopular: true,
//     },
//     {
//       title: "Business",
//       price: "£ 99 / Yearly",
//       features: [
//         "Unlimited Job Posts",
//         "Priority Placement in Search Results",
//         "Monthly Insights on Your Job Reach",
//       ],
//       isPopular: false,
//     },
//   ];

//   return (
//     <div className="bg-[#EBF1FA] pt-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidde">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
//             Choose your plan
//           </h1>
//           <p className="text-base text-gray-600 max-w-2xl mx-auto text-pretty">
//             Boost your job post to reach more candidates and hire faster.
//           </p>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//           {pricingPlans.map((plan, index) => (
//             <PricingCard
//               key={index}
//               title={plan.title}
//               price={plan.price}
//               features={plan.features}
//               isPopular={plan.isPopular}
//               onGetStarted={() => handleGetStarted(plan.title)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useGetPlansQuery } from "@/redux/features/planApi";
import { PricingCard } from "./pricing-card";
import LoadingSpinner from "@/lib/loading-spinner";

export default function PricingPage() {
  const { data, isLoading } = useGetPlansQuery();

  // Extract plans safely
  const planData = data?.plans ?? [];

  // const handleGetStarted = (plan: string) => {
  //     console.log(`[Landing] Selected plan: ${plan}`);
  // };

  return (
    <div className="bg-[#EBF1FA] pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Choose your plan
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto text-pretty">
            Boost your job post to reach more candidates and hire faster.
          </p>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planData.map((plan) => (
              <PricingCard
                key={plan._id}
                _id={plan._id}
                title={plan.title}
                price={plan.price ?? 0}
                duration={plan.duration}
                features={plan.features ?? []}
                paymentLink={plan.paymentLink ?? "/"}
                // isPopular={plan.title === "Pro"} // You can tweak logic for popular badge
                // onGetStarted={() => handleGetStarted(plan.title)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
