"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";

export function ProfileOverview() {
  // Sample data based on the forms we created
  const profileData = {
    name: "Md. Mizanur Rahman",
    pronouns: "He/Him",
    status: "Active today",
    experienceYears: "2 years of exp",
    location: "Bangladesh",
    timezone: "Your timezone",
    avatar: "/professional-headshot.png",

    workExperience: {
      title: "React Frontend Engineer",
      company: "Lab UI UX",
      duration: "Feb 2024 to May 2024 • 4 months",
      description:
        "Thrilled to announce I've completed a 2-month internship as a React Frontend Engineer ✨ at Lab UI UX. Worked on various projects, honing both front-end and back-end skills. Grateful for the team's support and proud for my contributions! 🚀",
    },

    education: [
      {
        degree: "Mern Stack (Frontend)",
        institution: "Programming Hero",
        year: "2024",
      },
      {
        degree: "BA, Bachelor of Arts",
        institution: "National University Of Bangladesh",
        year: "2021",
      },
    ],

    skills: [
      "React",
      "UX Design",
      "Javascript",
      "HTML",
      "CSS",
      "MongoDB",
      "Express.js",
      "Bootstrap",
      "ES6/ES7",
      "NodeJS",
      "TailwindCSS",
    ],

    idealOpportunity: {
      salary: "$120",
      role: "Software Engineer",
      roleOptions: "Open to Frontend Engineer or Full-Stack Engineer",
      remoteWork: "Onsite Or Remote",
      remoteDescription: "Accepts offers for remote and onsite roles",
      location: "Bangladesh (current)",
      techStack: ["Node.js", "Javascript", "React", "Bootstrap", "Express.js"],
      notInterestedIn: "Erlang, .NET or Scheme",
    },

    wants: [
      "To build products",
      "Company with clear roles",
      "To learn new things and develop skills",
      "Quiet office",
      "Progression to management",
      "Autonomy",
      "A flexible remote work policy",
    ],
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        What recruiters will see
      </h1>

      <Card className="mb-8">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={profileData.avatar || "/placeholder.svg"}
                alt={profileData.name}
              />
              <AvatarFallback className="text-lg">MR</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profileData.name}{" "}
                    <span className="text-gray-500 font-normal">
                      ({profileData.pronouns})
                    </span>
                  </h2>
                  <p className="text-sm text-green-600 font-medium">
                    {profileData.status}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {profileData.experienceYears} • {profileData.location} •{" "}
                    {profileData.timezone}
                  </p>
                </div>

                {/* <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Resume
                    </Button>
                  </div> */}
              </div>
            </div>
          </div>

          {/* Looking For Section */}
          {/* <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Looking for
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 leading-relaxed">
                {profileData.lookingFor}
              </p>
            </div>
          </div> */}

          {/* Achievements Section */}
          <div className="mb-8">
            {/* <h3 className="text-sm font-medium text-gray-700 mb-3">
              Achievements
            </h3> */}
            {/* <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <p className="text-gray-800 leading-relaxed">
                {profileData.achievements}
              </p>
              <a
                href={profileData.achievementLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline block"
              >
                {profileData.achievementLink}
              </a>
            </div> */}
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Experience
            </h3>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <Building className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {profileData.workExperience.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {profileData.workExperience.company}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  {profileData.workExperience.duration}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {profileData.workExperience.description}
                </p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Education
            </h3>
            <div className="space-y-3">
              {profileData.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-medium text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">
                    {edu.institution} • {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          {/* <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div> */}

          {/* Ideal Next Opportunity Section */}
          {/* <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Ideal next opportunity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Desired Salary
                </h4>
                <p className="text-gray-900">
                  {profileData.idealOpportunity.salary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Number
                </h4>
                <p className="text-gray-900">(808) 998-3456</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Desired Role
                </h4>
                <p className="text-gray-900">
                  {profileData.idealOpportunity.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {profileData.idealOpportunity.roleOptions}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Assistance hours:
                </h4>
                <p className="text-gray-900">
                  Monday - Friday 6 am to 8 pm EST
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Remote Work
                </h4>
                <p className="text-gray-900">
                  {profileData.idealOpportunity.remoteWork}
                </p>
                <p className="text-gray-600 text-sm">
                  {profileData.idealOpportunity.remoteDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Desired Location
                </h4>
                <p className="text-gray-900">
                  {profileData.idealOpportunity.location}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Desired Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.idealOpportunity.techStack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <X className="h-4 w-4" />
                <span>
                  Not interested in{" "}
                  {profileData.idealOpportunity.notInterestedIn}
                </span>
              </div>
            </div>
          </div> */}

         
        </CardContent>
      </Card>
    </div>
  );
}
