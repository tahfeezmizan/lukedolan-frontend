import ChatList from "@/components/profile/chat-list";
import React from "react";

import chatImg from "@/assets/telent-person.png";

// const messages = [
//   {
//     id: "1",
//     name: "Nova Hair Studio",
//     lastMessage: "We want to invite you for a qui...",
//     timestamp: "12 mins ago",
//     avatar: chatImg,
//     unread: true,
//   },
//   {
//     id: "2",
//     name: "Glamour Nails",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "3",
//     name: "Glamour Nails",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "4",
//     name: "Nova Hair Studio",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "5",
//     name: "Nova Hair Studio",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "6",
//     name: "Nova Hair Studio",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "7",
//     name: "Glamour Nails",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
//   {
//     id: "8",
//     name: "Glamour Nails",
//     lastMessage: "Hey thanks for your interview...",
//     timestamp: "3:40 PM",
//     avatar: chatImg,
//   },
// ];

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 overflow-hidden">
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-2 h-screen ">
          <ChatList />
        </div>

        <div className="col-span-4 h-screen">{children}</div>
      </div>
    </div>
  );
}
