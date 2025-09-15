"use client";

import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Download,
  GraduationCap,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function ApplicantProfile() {
  return (
    <section className=" px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 ">
          {/* Left Column - Profile Card */}
          <div className="col-auto md:col-span-1 bg-white p-6 rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto shadow-lg ">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                John Doe
              </h3>
              <p className="text-gray-600 font-medium">
                Senior Hair Specialist
              </p>
              <div className="mt-4">
                <span className="bg-green-900/70 text-white text-lg font-semibold px-4 py-1.5 rounded-full">
                  Open to work
                </span>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Languages
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  English
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Spanish
                </li>
              </ul>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Bio</h4>
              <p className="text-gray-700 leading-relaxed text-sm">
                With 15 years of experience in bookkeeping and finance, I am
                confident in my ability to contribute positively to the smooth
                and efficient running of your business. I specialize in managing
                accounts, payroll, and credit control for both small and large
                organizations.
              </p>
            </div>

            {/* Salary Expectations */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Salary Expectations
              </h4>
              <p className="text-2xl font-bold text-gray-900">2000</p>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Skills
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Hair colouring
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Bridal Styling
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Account payable management
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Contact
              </h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Resume/CV */}
          <div className="col-span-2 space-y-6 ">
            <div className="bg-white p-8 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                      alt="John Doe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      John Doe
                    </h3>
                    <p className="text-gray-600">Web Designer</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>2901 Maddox Square, Los Angeles,</p>
                  <p>CA 90908</p>
                  <p>john@example.com</p>
                  <p>+1 555 123 4567</p>
                </div>
              </div>

              {/* Profile & Employment */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Profile */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                    Profile
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Graphic designer with 10 years of experience in branding and
                    print design. Skilled in Adobe Creative Suite (Photoshop,
                    Illustrator) as well as typography and layout design.
                    Experienced in print production, packaging design, and
                    corporate branding.
                  </p>
                </div>

                {/* Employment */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                    Employment
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">
                        UI Designer at Market Studios
                      </h5>
                      <p className="text-xs text-gray-600 mb-2">
                        2019 - Present
                      </p>
                      <p className="text-xs text-gray-700">
                        Successfully designed and launched 5 mobile apps,
                        improving user experience and increasing user engagement
                        by 40%.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">
                        Graphic Designer at Firework
                      </h5>
                      <p className="text-xs text-gray-600 mb-2">2017 - 2019</p>
                      <p className="text-xs text-gray-700">
                        Led brand identity projects for 15+ clients, creating
                        memorable visual identities and marketing materials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  Education
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-sm text-gray-600 w-16">2015</div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">
                        Los Angeles University
                      </h5>
                      <p className="text-xs text-gray-600">
                        Bachelor of Fine Arts, Graphic Design
                      </p>
                      <p className="text-xs text-gray-700">GPA: 3.8/4.0</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-sm text-gray-600 w-16">2013</div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">
                        New York University
                      </h5>
                      <p className="text-xs text-gray-600">
                        Master of Graphic Design
                      </p>
                      <p className="text-xs text-gray-700">GPA: 3.9/4.0</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Skills */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Skills
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-3">
                      Professional
                    </h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Figma</li>
                      <li>• Sketch App</li>
                      <li>• Adobe Photoshop</li>
                      <li>• Adobe Illustrator</li>
                      <li>• HTML/CSS</li>
                      <li>• Prototyping</li>
                      <li>• After Effects</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-3">
                      Personal
                    </h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Communication</li>
                      <li>• Team management</li>
                      <li>• Teamwork</li>
                      <li>• Problem solving</li>
                      <li>• Attention to details</li>
                      <li>• Time to learn</li>
                      <li>• Meeting deadlines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Resume Button */}
            <Button className="w-full rounded-lg bg-green-900 text-lg px-6 py-5 text-white  hover:bg-green-700 font-medium flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
