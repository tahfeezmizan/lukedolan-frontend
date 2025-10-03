"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form data:", formData);
  };

  return (
    <div className="bg-[#EBF1FA] pt-10 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ">
        <div className="bg-white p-8 rounded-lg">
          {/* Header Section */}
          <div className="mb-12 bg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xl md:text-2xl  mb-2">Get Started</p>
                <h1 className="text-xl md:text-4xl font-bold  text-balance ">
                  Get in touch with us. We&apos;re here to assist you.
                </h1>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <Instagram size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <Twitter size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xl font-medium  mb-2"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full !text-lg border-0  border-b-2 border-black rounded-none outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xl font-medium  mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full !text-lg border-0  border-b-2 border-black rounded-none outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xl font-medium  mb-2"
                >
                  Phone Number (optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full !text-lg border-0  border-b-2 border-black rounded-none outline-none"
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-xl font-medium  mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full min-h-32 !text-lg border-0  border-b-2 border-black rounded-none outline-none "
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg flex items-center gap-2"
            >
              Leave us a Message
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* Contact Info Section */}
          <div className="border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <h3 className="text-md md:text-xl font-medium  mb-4">
                  Contact Info
                </h3>
                <h2 className="text-3xl font-bold  text-balance">
                  We are always happy to assist you
                </h2>
              </div>

              <div className="col-span-1">
                <h4 className="text-xl font-semibold  mb-2">Email Address</h4>
                <div className="w-8 h-0.5 bg-gray-900 mb-4"></div>
                <p className="text-xl  mb-2">help@info.com</p>
                <p className="text-lg ">
                  Assistance hours:
                  <br />
                  Monday - Friday 6 am to 8 pm EST
                </p>
              </div>

              <div className="col-span-1">
                <h4 className="text-xl font-semibold  mb-2">Number</h4>
                <div className="w-8 h-0.5 bg-gray-900 mb-4"></div>
                <p className="text-xl  mb-2">(808) 998-3256</p>
                <p className="text-lg ">
                  Assistance hours:
                  <br />
                  Monday - Friday 6 am to 8 pm EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
