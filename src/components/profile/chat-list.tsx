"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChatList({ messages }: { messages: any[] }) {
  const pathname = usePathname();

  // base path condition
  let basePath = "/recruiter/messages";
  if (pathname.startsWith("/profile/messages")) {
    basePath = "/profile/messages";
  } else if (pathname.startsWith("/admin/messages")) {
    basePath = "/admin/messages";
  }

  return (
    <div className="w-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search messages"
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((chat) => (
          <div key={chat.id}>
            <div
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                chat.id === chat.id
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <Link href={`${basePath}/${chat.id}`}>
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {chat.unread && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
