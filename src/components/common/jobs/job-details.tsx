import React from "react";

import { CheckCircleIcon } from "lucide-react";
// app/lib/jobData.ts
interface JobInfo {
  companyProfile: string;
  description: string;
  responsibilities: string[];
  whoYouAre: string[];
  niceToHaves: string[];
}

export const jobInfo: JobInfo = {
  companyProfile:
    "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure—from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.",
  description:
    "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
  responsibilities: [
    "Community engagement to ensure that is supported and actively represented online",
    "Focus on social media content development and publication",
    "Marketing and strategy support",
    "Stay on top of trends on social media platforms, and suggest content ideas to the team",
    "Engage with online communities",
  ],
  whoYouAre: [
    "You get energy from people and building the ideal work environment",
    "You have a sense for beautiful spaces and office experiences",
    "You are a confident office manager, ready for added responsibilities",
    "You're detail-oriented and creative",
    "You're a growth marketer and know how to run campaigns",
  ],
  niceToHaves: [
    "Fluent in English",
    "Project management skills",
    "Copy editing skills",
  ],
};

export default function JobDetail({data}: {data: any}) {
  return (
    <aside className="w-full  bg-white p-8 rounded-lg">
      <div className="space-y-8">
        {/* Company Profile */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Company Profile
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {jobInfo.companyProfile}
          </p>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{jobInfo.description}</p>
        </section>

        {/* Responsibilities */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Responsibilities
          </h2>
          <ul className="space-y-3">
            {jobInfo.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who You Are */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Who You Are</h2>
          <ul className="space-y-3">
            {jobInfo.whoYouAre.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Nice-To-Haves */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Nice-To-Haves
          </h2>
          <ul className="space-y-3">
            {jobInfo.niceToHaves.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
