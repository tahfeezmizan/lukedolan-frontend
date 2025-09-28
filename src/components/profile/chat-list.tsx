/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/utils";
import { useGetChatsQuery } from "@/redux/features/chatAPI";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";

export default function ChatList() {
  const pathname = usePathname();
  const { data, isLoading, isError } = useGetChatsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data, "chat");

  // Filter chats based on search term
  const filteredMessages = useMemo(() => {
    const messages = data?.data || [];

    if (!searchTerm.trim()) {
      return messages;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return messages.filter((chat: any) => {
      const participant = chat.participants?.[0] || {};
      const participantName = participant.name || "";

      return participantName.toLowerCase().includes(lowercasedSearchTerm);
    });
  }, [data?.data, searchTerm]);

  // base path condition
  let basePath = "/recruiter/messages";
  if (pathname.startsWith("/profile/messages")) {
    basePath = "/profile/messages";
  } else if (pathname.startsWith("/admin/messages")) {
    basePath = "/admin/messages";
  }

  if (isLoading) {
    return <div className="p-4">Loading chats...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load chats</div>;
  }

  return (
    <aside className="">
      <div className="w-full bg-white border-r border-gray-200 flex flex-col">
        {/* 🔍 Search bar */}
        <div className="p-3 py-3.5 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages"
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm
                ? "No chats found matching your search"
                : "No chats available"}
            </div>
          ) : (
            filteredMessages.map((chat: any) => {
              const participant = chat.participants?.[0] || {};
              return (
                <div
                  key={chat._id}
                  className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Link href={`${basePath}/${chat._id}`}>
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Image
                          src={getImageUrl(participant.image)}
                          alt={participant.name || "Chat"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {participant.name || "Unknown"}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {chat.lastMessage?.createdAt
                              ? new Date(
                                  chat.lastMessage.createdAt
                                ).toLocaleTimeString()
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {chat.lastMessage?.text || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}