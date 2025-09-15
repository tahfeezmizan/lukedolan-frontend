"use client";

import { useState } from "react";
import {
  Pin,
  Star,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import chatImg from "@/assets/telent-person.png";

// Chat Messages Data
const messages = [
  {
    id: 1,
    sender: "Nova Hair Studio",
    avatar: chatImg,
    content:
      "Hi Sophia, we loved your profile. Are you available this weekend for a bridal hairstyling session?",
    timestamp: "12 mins ago",
    isUser: false,
  },
  {
    id: 2,
    sender: "Nova Hair Studio",
    avatar: chatImg,
    content: "We want to invite you for a quick interview",
    timestamp: "12 mins ago",
    isUser: false,
  },
  {
    id: 3,
    sender: "Sophia",
    avatar: chatImg,
    content:
      "Yes, I'm available Saturday afternoon. Could you share the exact timing and location?",
    timestamp: "12 mins ago",
    isUser: true,
  },
];

export default function ChatDetail() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={messages[0].avatar || "/placeholder.svg"}
              alt={messages[0].sender}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-900">
                {messages[0].sender}
              </h2>
              <p className="text-sm text-gray-600">{messages[0].sender}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Chat Beginning */}
        <div className="text-center">
          <Image
            src={messages[0].avatar || "/placeholder.svg"}
            alt={messages[0].sender}
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {messages[0].sender}
          </h3>
          <p className="text-gray-600 mb-4">
            Recruiter at <span className="text-blue-600">Nomad</span>
          </p>
          <p className="text-gray-500 text-sm">
            This is the very beginning of your direct message with{" "}
            <strong>{messages[0].sender}</strong>
          </p>
        </div>

        {/* Date Separator */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-xs text-gray-600">Today</span>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-2xl ${
                  msg.isUser ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Image
                  src={msg.avatar || "/placeholder.svg"}
                  alt={msg.sender}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className={`space-y-1 ${msg.isUser ? "text-right" : ""}`}>
                  {!msg.isUser && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-gray-900">
                        {msg.sender}
                      </span>
                    </div>
                  )}
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-gray-500">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Reply message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
