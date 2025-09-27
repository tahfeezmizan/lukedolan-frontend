// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";
// import io, { Socket } from "socket.io-client";
// import placeholderImg from "@/assets/telent-person.png";
// import {
//   useGetMessagesQuery,
//   useSendMessageMutation,
// } from "@/redux/features/chatAPI";
// import { useGetUserQuery } from "@/redux/features/userApi";
// import { PageLoading } from "../shared/page-loading";

// interface Message {
//   _id: string;
//   sender: string;
//   text: string;
//   createdAt: string;
// }

// interface ChatDetailProps {
//   myId: string;
// }

// export default function ChatDetail() {
//   const params = useParams();
//   const { id } = params;
//   const chatId = id as string;
//   const { data: userData } = useGetUserQuery();

//   const myId = userData?.data?.profile?._id;
//   console.log(myId, "myId");

//   // console.log("Profile Data:", profileData?.profile?._id);

//   const [messages, setMessages] = useState<Message[]>([]);
//   // Only get participant info and initial setup, don't rely on paginated messages
//   // const { data, isLoading, isError } = useGetMessagesQuery(chatId, {
//   //   skip: !chatId,
//   // });
//   const { data, isLoading } = useGetMessagesQuery({
//     chatId,
//     page: 1,
//     limit: 20,
//   });

//   useEffect(() => {
//     if (data?.data?.messages) {
//       console.log(data.data, "data😂😂😂😂");
//       setMessages(data.data.messages);
//     }
//   }, [data]);
//   // Send message mutation
//   const [sendMessageAPI] = useSendMessageMutation();

//   // Local state - this is the source of truth for messages (like your working example)
//   const [messageText, setMessageText] = useState("");

//   const [isSocketConnected, setIsSocketConnected] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Socket connection (simplified like your working example)
//   const socket: Socket = useMemo(() => io("http://10.10.7.62:5001"), []);

//   useEffect(() => {
//     if (!chatId || !socket) return;

//     // Connection status
//     socket.on("connect", () => {
//       console.log("Socket connected");
//       setIsSocketConnected(true);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//       setIsSocketConnected(false);
//     });

//     // Listen for new messages (exactly like your working example)
//     const receiveMessageHandler = (newMessage: Message) => {
//       console.log("Received message:", newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };
//     // !important: This event name must match the one used in the server
//     socket.on(`getMessage::${chatId}`, receiveMessageHandler);

//     return () => {
//       socket.off(`getMessage::${chatId}`, receiveMessageHandler);
//       socket.off("connect");
//       socket.off("disconnect");
//     };
//   }, [chatId, socket]);

//   // Send message (exactly like your working example)
//   const handleSendMessage = async () => {
//     if (!messageText.trim()) return;

//     const messageTextToSend = messageText.trim();

//     try {
//       // Clear input immediately
//       setMessageText("");

//       // Save to database first
//       const messageData = {
//         chatId,
//         text: messageTextToSend,
//         type: "TEXT",
//       };

//       console.log("Sending message to API:", messageData);
//       await sendMessageAPI(messageData).unwrap();

//       // Send via socket (like your working example)
//       const socketData = {
//         chatId,
//         senderId: myId,
//         text: messageTextToSend,
//       };

//       console.log("Sending via socket:", socketData);
//       socket.emit("sendMessage", socketData);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Restore message text on error
//       setMessageText(messageTextToSend);
//       alert("Failed to send message. Please try again.");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   if (isLoading) {
//     return <PageLoading />;
//   }

//   if (data?.error) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500">Failed to load chat</p>
//           <Button
//             onClick={() => window.location.reload()}
//             variant="outline"
//             className="mt-2"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const participant = data?.data?.participant || {};
//   console.log(messages, "messages");

//   return (
//     <div className="flex-1 flex flex-col bg-white h-full">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <Image
//             src={participant.image || placeholderImg}
//             alt={participant.name || "User"}
//             width={40}
//             height={40}
//             className="rounded-full mr-3"
//           />
//           <h2 className="font-semibold">{participant.name || "Chat"}</h2>
//         </div>

//         {/* Connection status */}
//         <div className="flex items-center space-x-2">
//           <div
//             className={`w-2 h-2 rounded-full ${
//               isSocketConnected ? "bg-green-500" : "bg-red-500"
//             }`}
//           />
//           <span className="text-xs text-gray-500">
//             {isSocketConnected ? "Online" : "Offline"}
//           </span>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           messages?.map((message) => (
//             <div
//               key={message._id}
//               className={`flex ${
//                 message.sender == myId ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-sm px-4 py-2 rounded-lg ${
//                   message.sender == myId
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-black"
//                 }`}
//               >
//                 <p className="text-sm break-words">{message.text}</p>
//                 <p className="text-xs mt-1 opacity-70">
//                   {new Date(message.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                   })}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="bg-white border-t border-gray-200 p-4 flex space-x-2">
//         <Input
//           placeholder="Type a message..."
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="flex-1"
//         />
//         <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
//           <Send className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }

//------------------------------------v2------------------------------------
"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import io, { Socket } from "socket.io-client";
import placeholderImg from "@/assets/telent-person.png";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/chatAPI";
import { useGetUserQuery } from "@/redux/features/userApi";
import { PageLoading } from "../shared/page-loading";

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
}

export default function ChatDetail() {
  const params = useParams();
  const { id } = params;
  const chatId = id as string;
  const { data: userData } = useGetUserQuery();
  const myId = userData?.data?.profile?._id;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Messages state
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  // RTK Query for messages with dynamic page
  const { data, isLoading, isError } = useGetMessagesQuery(
    { chatId, page: currentPage, limit: 10 },
    { skip: !chatId }
  );

  // Update messages when data changes
  useEffect(() => {
    if (data?.data) {
      console.log(
        "Data received, page:",
        currentPage,
        "messages:",
        data.data.messages?.length
      );

      if (currentPage === 1) {
        setAllMessages(data.data.messages || []);
        setIsInitialLoad(false);
      } else {
        setAllMessages((prev) => {
          const newMessages = data.data.messages || [];
          const existingIds = new Set(prev.map((msg) => msg._id));
          const uniqueNewMessages = newMessages.filter(
            (msg) => !existingIds.has(msg._id)
          );
          return [...uniqueNewMessages, ...prev];
        });
      }
      console.log(
        "Pagination:",
        data.data.pagination.totalPage,
        data.data.pagination.total,
        hasMore
      );

      setHasMore(
        data.data.pagination.totalPage > currentPage &&
          data.data.pagination.total > allMessages.length

        // data.data.hasMore !== false && data.data.messages?.length === 5
      );
      setIsLoadingMore(false);
    }
  }, [data, currentPage]);

  const [sendMessageAPI] = useSendMessageMutation();
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  // Socket connection
  const socket: Socket = useMemo(() => io("http://10.10.7.62:5001"), []);

  // Scroll handler with throttle
  const handleScroll = useCallback(() => {
    console.log(
      "Current page:",
      currentPage,
      "Has more:",
      hasMore,
      "Is loading more:",
      isLoadingMore
    );
    if (isFetching.current || isLoadingMore || !hasMore) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;

    // Load more when scrolled to top (within 100px)
    console.log(
      "Scroll position:",
      scrollTop,
      "Container height:",
      container.scrollHeight,
      "Visible height:",
      container.clientHeight
    );
    if (scrollTop <= 50) {
      console.log("Scrolled to top, loading page:", currentPage + 1);
      isFetching.current = true;
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);

      // Throttle requests
      setTimeout(() => {
        isFetching.current = false;
      }, 500);
    }
  }, [isLoadingMore, hasMore, currentPage]);

  // Add scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to bottom on new messages or initial load
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    if (currentPage === 1 && allMessages.length > 0) {
      // Scroll to bottom on initial load
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  }, [allMessages.length, currentPage]);

  // Socket events
  useEffect(() => {
    if (!chatId || !socket) return;

    socket.on("connect", () => setIsSocketConnected(true));
    socket.on("disconnect", () => setIsSocketConnected(false));

    const receiveMessageHandler = (newMessage: Message) => {
      setAllMessages((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });

      // Scroll to bottom when new message arrives
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    socket.on(`getMessage::${chatId}`, receiveMessageHandler);

    return () => {
      socket.off(`getMessage::${chatId}`, receiveMessageHandler);
    };
  }, [chatId, socket]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      const messageTextToSend = messageText.trim();
      setMessageText("");

      await sendMessageAPI({
        chatId,
        text: messageTextToSend,
        type: "TEXT",
      }).unwrap();

      socket.emit("sendMessage", {
        chatId,
        senderId: myId,
        text: messageTextToSend,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Reset when chat changes
  useEffect(() => {
    setCurrentPage(1);
    setAllMessages([]);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [chatId]);

  if (isLoading && isInitialLoad) {
    return <PageLoading />;
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load chat</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const participant = data?.data?.participant || {};

  return (
    <div className="flex-1 flex flex-col bg-white h-screen">
      {" "}
      {/* Changed to h-screen */}
      {/* Header - fixed height */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center">
          <Image
            src={participant.image || placeholderImg}
            alt={participant.name || "User"}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <h2 className="font-semibold">{participant.name || "Chat"}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isSocketConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-gray-500">
            {isSocketConnected ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      {/* Messages Container - scrollable area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" // Key fix: min-h-0
      >
        {isLoadingMore && (
          <div className="flex justify-center py-2">
            <div className="text-sm text-gray-500">
              Loading more messages...
            </div>
          </div>
        )}

        {allMessages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          allMessages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender == myId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-lg ${
                  message.sender == myId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm break-words">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input - fixed height */}
      <div className="bg-white border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0">
        <Input
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

//------------------------------------------v3--------------------------------------


