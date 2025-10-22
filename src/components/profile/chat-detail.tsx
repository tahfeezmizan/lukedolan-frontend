// "use client";

// import placeholderImg from "@/assets/telent-person.png";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { getImageUrl } from "@/lib/utils";
// import {
//   useGetChatsQuery,
//   useGetMessagesQuery,
//   useSendMessageMutation,
// } from "@/redux/features/chatAPI";
// import { useGetMeQuery } from "@/redux/features/userApi";
// import { AlertCircle, CircleUserRound, Send } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import io, { Socket } from "socket.io-client";
// import { InfiniteScrollLoaderPresets } from "../shared/infinite-scroll-loader";
// import { PageLoading } from "../shared/page-loading";
// import { useInfiniteScroll } from "../shared/use-infinite-scroll";

// interface Message {
//   _id: string;
//   sender: string;
//   text: string;
//   createdAt: string;
//   chatId: string;
// }
// export default function ChatDetail() {
//   const params = useParams();
//   const { id } = params;
//   const chatId = id as string;

//   const { data: userData } = useGetMeQuery("");
//   const myId = userData?._id;

//   // State management
//   const [allMessages, setAllMessages] = useState<Message[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [loadingError, setLoadingError] = useState<string | null>(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [containerHeight, setContainerHeight] = useState<string>("100vh");
//   const [messageText, setMessageText] = useState("");
//   const [isSocketConnected, setIsSocketConnected] = useState(false);

//   // RTK Query hooks - moved BEFORE any conditional returns
//   const { data, isLoading, isError, error } = useGetMessagesQuery(
//     { chatId, page: currentPage, limit: 10 },
//     { skip: !chatId }
//   );
//   const { data: chatData } = useGetChatsQuery(undefined);

//   console.log("All Data", data);

//   const activeUser = chatData?.data.find(
//     (chat: { _id: string }) => chat._id === chatId
//   );
//   console.log(activeUser);

//   // Refs
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const isScrollingToBottom = useRef(false);
//   const requestIdRef = useRef(0);
//   const lastRequestTimeRef = useRef(0);

//   // Debounced load more function for infinite scroll
//   const handleLoadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore && !isInitialLoad) {
//       const now = Date.now();
//       const timeSinceLastRequest = now - lastRequestTimeRef.current;

//       // Debounce: prevent requests within 500ms of each other
//       if (timeSinceLastRequest < 500) {
//         return;
//       }

//       console.log("Loading more messages - Page:", currentPage + 1);

//       // Update request tracking
//       requestIdRef.current += 1;
//       lastRequestTimeRef.current = now;

//       setIsLoadingMore(true);
//       setLoadingError(null);
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [isLoadingMore, hasMore, isInitialLoad, currentPage]);

//   // Optimized infinite scroll hook
//   const {
//     sentinelRef: triggerRef,
//     containerRef,
//     scrollToBottom,
//     maintainScrollPosition,
//   } = useInfiniteScroll({
//     hasMore,
//     isLoading: isLoadingMore,
//     onLoadMore: handleLoadMore,
//     threshold: 0.1,
//     rootMargin: "50px",
//     debounceMs: 200,
//   });

//   // Socket connection
//   const socket: Socket = useMemo(() => io("http://10.10.7.62:5001"), []);

//   console.log(socket)

//   const [sendMessageAPI] = useSendMessageMutation();

//   // Dynamic height management for responsive design
//   useEffect(() => {
//     const updateContainerHeight = () => {
//       const viewportHeight = window.innerHeight;
//       const headerHeight = 80; // Approximate header height
//       const inputHeight = 80; // Approximate input area height
//       const availableHeight = viewportHeight - headerHeight - inputHeight;

//       setContainerHeight(`${Math.max(availableHeight, 300)}px`);
//     };

//     updateContainerHeight();
//     window.addEventListener("resize", updateContainerHeight);

//     return () => window.removeEventListener("resize", updateContainerHeight);
//   }, []);

//   // Optimized retry handler for failed loads with request tracking
//   const handleRetryLoadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       // Reset request tracking for retry
//       requestIdRef.current += 1;
//       lastRequestTimeRef.current = Date.now();

//       setLoadingError(null);
//       setIsLoadingMore(true);
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [isLoadingMore, hasMore]);

//   // Update messages when data changes
//   useEffect(() => {
//     if (data?.data) {
//       console.log(
//         "Data received - Page:",
//         currentPage,
//         "Messages:",
//         data.data.messages?.length
//       );

//       if (currentPage === 1) {
//         // Initial load
//         setAllMessages(data.data.messages || []);
//         setIsInitialLoad(false);
//         isScrollingToBottom.current = true;
//       } else {
//         // Infinite scroll load - maintain scroll position
//         setAllMessages((prev) => {
//           const newMessages = data.data.messages || [];
//           const existingIds = new Set(prev.map((msg) => msg._id));
//           const uniqueNewMessages = newMessages.filter(
//             (msg: Message) => !existingIds.has(msg._id)
//           );
//           return [...uniqueNewMessages, ...prev];
//         });

//         // Maintain scroll position after loading new messages
//         setTimeout(() => {
//           maintainScrollPosition();
//         }, 50);
//       }

//       // Update pagination state
//       const pagination = data.data.pagination;
//       if (pagination) {
//         setHasMore(pagination.totalPage > currentPage);
//       } else {
//         setHasMore(false);
//       }

//       setIsLoadingMore(false);
//       setLoadingError(null);
//     }
//   }, [data, currentPage, maintainScrollPosition]);

//   // Enhanced API error handling with request tracking
//   useEffect(() => {
//     if (isError && error) {
//       console.error("Messages API error:", error);

//       // Only handle error if it's for the current request
//       const currentRequestId = requestIdRef.current;

//       setTimeout(() => {
//         // Check if this is still the current request
//         if (requestIdRef.current === currentRequestId) {
//           setIsLoadingMore(false);
//           setLoadingError("Failed to load messages. Please try again.");
//         }
//       }, 100); // Small delay to prevent race conditions
//     }
//   }, [isError, error]);

//   // Enhanced scroll to bottom for initial load and new messages
//   useEffect(() => {
//     if (isScrollingToBottom.current && allMessages?.length > 0) {
//       // Use the optimized scroll function
//       scrollToBottom();
//       isScrollingToBottom.current = false;
//     }
//   }, [allMessages, scrollToBottom]);

//   // Optimized initial scroll positioning
//   useEffect(() => {
//     if (!isInitialLoad && currentPage === 1 && allMessages?.length > 0) {
//       const container = containerRef.current;
//       if (container && messagesEndRef.current) {
//         // Single, smooth scroll to bottom after initial messages are loaded
//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//             container.scrollTo({
//               top: container.scrollHeight,
//               behavior: "auto",
//             });
//           });
//         });
//       }
//     }
//   }, [isInitialLoad, allMessages?.length, currentPage, containerRef]);

//   // Socket events
//   useEffect(() => {
//     if (!chatId || !socket) return;

//     socket.on("connect", () => setIsSocketConnected(true));
//     // socket.on("disconnect", () => setIsSocketConnected(false));

//     const receiveMessageHandler = (newMessage: Message) => {
//       setAllMessages((prev) => {
//         if (prev.some((msg) => msg._id === newMessage._id)) return prev;

//         const updatedMessages = [...prev, newMessage];

//         // Optimized auto-scroll to bottom for new messages
//         requestAnimationFrame(() => {
//           const container = containerRef.current;
//           if (container && messagesEndRef.current) {
//             const { scrollTop, scrollHeight, clientHeight } = container;
//             const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

//             if (isNearBottom) {
//               // Smooth scroll to bottom
//               container.scrollTo({
//                 top: container.scrollHeight,
//                 behavior: "smooth",
//               });
//             }
//           }
//         });

//         return updatedMessages;
//       });
//     };

//     socket.on(`getMessage::${chatId}`, receiveMessageHandler);

//     return () => {
//       // socket.off(`getMessage::${chatId}`, receiveMessageHandler);
//       // socket.disconnect();
//     };
//   }, [chatId, socket, containerRef]);

//   const handleSendMessage = async () => {
//     if (!messageText.trim()) return;

//     // try {
//     //   const messageTextToSend = messageText.trim();
//     //   setMessageText("");

//     //   await sendMessageAPI({
//     //     chatId,
//     //     text: messageTextToSend,
//     //     type: "TEXT",
//     //   }).unwrap();

//     //   socket.emit("sendMessage", {
//     //     chatId,
//     //     senderId: myId,
//     //     text: messageTextToSend,
//     //   });

//     //   // Optimized scroll to bottom after sending message
//     //   requestAnimationFrame(() => {
//     //     const container = containerRef.current;
//     //     if (container) {
//     //       container.scrollTo({
//     //         top: container.scrollHeight,
//     //         behavior: "smooth",
//     //       });
//     //     }
//     //   });
//     // } catch (error) {
//     //   console.error("Failed to send message:", error);
//     //   alert("Failed to send message. Please try again.");
//     // }
//     try {
//       const messageTextToSend = messageText.trim();
//       setMessageText("");

//       const newMessage: Message = {
//         _id: `${Date.now()}`, // temporary unique id
//         sender: myId,
//         text: messageTextToSend,
//         createdAt: new Date().toISOString(),
//         chatId,
//       };

//       // Optimistically update UI
//       setAllMessages((prev) => [...prev, newMessage]);

//       // Send to API
//       await sendMessageAPI({
//         chatId,
//         text: messageTextToSend,
//         type: "TEXT",
//       }).unwrap();

//       // Emit via socket
//       socket.emit("sendMessage", {
//         chatId,
//         senderId: myId,
//         text: messageTextToSend,
//       });

//       // Scroll to bottom
//       requestAnimationFrame(() => {
//         const container = containerRef.current;
//         if (container) {
//           container.scrollTo({
//             top: container.scrollHeight,
//             behavior: "smooth",
//           });
//         }
//       });
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       alert("Failed to send message. Please try again.");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Reset when chat changes
//   useEffect(() => {
//     setCurrentPage(1);
//     setAllMessages([]);
//     setHasMore(true);
//     setIsInitialLoad(true);
//     setIsLoadingMore(false);
//     setLoadingError(null);
//     isScrollingToBottom.current = false;
//   }, [chatId]);

//   if (isLoading && isInitialLoad) {
//     return <PageLoading />;
//   }

//   if (isError && isInitialLoad) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <p className="text-red-500 mb-4">Failed to load chat</p>
//           <Button onClick={() => window.location.reload()} variant="outline">
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-white min-h-[calc(100vh-128px)]">
//       {/* Header - fixed height */}
//       <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between flex-shrink-0">
//         <div className="flex items-center">
//           {activeUser?.participants[0]?.image ? (
//             <Image
//               src={
//                 activeUser?.participants[0]?.image
//                   ? getImageUrl(activeUser?.participants[0]?.image)
//                   : placeholderImg
//               }
//               alt={activeUser?.participants[0]?.name || "User"}
//               width={40}
//               height={40}
//               className="rounded-full mr-3"
//             />
//           ) : (
//             <CircleUserRound className="size-11 mr-3" />
//           )}

//           <h2 className="font-semibold">
//             {activeUser?.participants[0]?.name || "Chat"}
//           </h2>
//         </div>
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

//       {/* Messages Container - scrollable area with dynamic height */}
//       <div
//         ref={containerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 pb-16 "
//         style={{
//           scrollBehavior: "auto",
//           maxHeight: containerHeight,
//           height: containerHeight,
//         }}
//       >
//         {/* Intersection Observer trigger for infinite scroll */}
//         <div ref={triggerRef} className="h-1 " />

//         {/* Loading indicator for infinite scroll */}
//         <InfiniteScrollLoaderPresets.Chat isLoading={isLoadingMore} />

//         {/* Error indicator for infinite scroll */}
//         <InfiniteScrollLoaderPresets.Chat
//           hasError={!!loadingError}
//           errorMessage={loadingError || undefined}
//           onRetry={handleRetryLoadMore}
//         />

//         {/* No more messages indicator */}
//         <InfiniteScrollLoaderPresets.Chat
//           showNoMoreData={!hasMore && allMessages?.length > 0 && !isInitialLoad}
//         />

//         {/* Messages */}
//         {allMessages?.length === 0 && !isLoading ? (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           allMessages?.map((message, index) => {
//             const isMyMessage = message.sender.toString() === myId?.toString();

//             return (
//               <div
//                 key={index}
//                 className={`flex mb-4  ${
//                   isMyMessage ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div>
//                   <p
//                     className={`text-base leading-relaxed rounded-full py-0.5 px-1.5 ${
//                       isMyMessage
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {message.text}
//                   </p>
//                   <p
//                     className={`text-xs mt-1 text-gray-500 ${
//                       isMyMessage ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     {new Date(message.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input - fixed height */}
//       <div className="bg-white fixed bottom-1 w-[60%] border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0">
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


"use client";

import placeholderImg from "@/assets/telent-person.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/utils";
import {
  useGetChatsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/chatAPI";
import { useGetMeQuery } from "@/redux/features/userApi";
import { AlertCircle, CircleUserRound, Send } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { PageLoading } from "../shared/page-loading";

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
  chatId: string;
}

export default function ChatDetail() {
  const params = useParams();
  const { id } = params;
  const chatId = id as string;

  const { data: userData } = useGetMeQuery("");
  const myId = userData?._id;

  // State management
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [containerHeight, setContainerHeight] = useState<string>("100vh");

  // RTK Query hooks
  const { data, isLoading, isError, error } = useGetMessagesQuery(
    { chatId, page: 1, limit: 50 },
    { skip: !chatId }
  );
  const { data: chatData } = useGetChatsQuery(undefined);
  const [sendMessageAPI] = useSendMessageMutation();

  const activeUser = chatData?.data.find(
    (chat: { _id: string }) => chat._id === chatId
  );

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Dynamic height management
  useEffect(() => {
    const updateContainerHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80;
      const inputHeight = 80;
      const availableHeight = viewportHeight - headerHeight - inputHeight;
      setContainerHeight(`${Math.max(availableHeight, 300)}px`);
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  // Socket connection management - FIXED
  useEffect(() => {
    if (!chatId || !myId) return;

    console.log("🔌 Connecting to socket for chat:", chatId);
    
    const newSocket = io("https://api.goroqit.com");
    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      console.log("✅ Socket connected");
      setIsSocketConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsSocketConnected(false);
    });

    // Listen for the EXACT event name that backend emits
    const receiveMessageHandler = (newMessage: Message) => {
      console.log("📨 REAL-TIME MESSAGE RECEIVED:", newMessage);
      
      setAllMessages((prev) => {
        // Prevent duplicates
        if (prev.some((msg) => msg._id === newMessage._id)) {
          console.log("🔄 Message already exists, skipping");
          return prev;
        }
        
        console.log("✅ Adding new message to UI");
        const updatedMessages = [...prev, newMessage];
        
        // Scroll to bottom
        setTimeout(() => {
          scrollToBottom();
        }, 100);
        
        return updatedMessages;
      });
    };

    // Listen to the EXACT event name: getMessage::chatId
    const exactEventName = `getMessage::${chatId}`;
    console.log("👂 Listening for event:", exactEventName);
    newSocket.on(exactEventName, receiveMessageHandler);

    // Debug: log all socket events
    newSocket.onAny((eventName, ...args) => {
      console.log("📡 ALL Socket event:", eventName, args);
      
      // If we see the exact event but handler didn't trigger, manually call it
      if (eventName === exactEventName && args[0]) {
        console.log("🔄 Manually triggering handler for:", eventName);
        receiveMessageHandler(args[0]);
      }
    });

    // Cleanup
    return () => {
      console.log("🧹 Cleaning up socket");
      newSocket.off(exactEventName, receiveMessageHandler);
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, [chatId, myId]);

  // Load initial messages
  useEffect(() => {
    if (data?.data?.messages) {
      console.log("📦 Loading initial messages:", data.data.messages.length);
      setAllMessages(data.data.messages);
      setTimeout(() => scrollToBottom(), 500);
    }
  }, [data]);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Send message function
  const handleSendMessage = async () => {
    if (!messageText.trim() || !myId) return;

    try {
      const messageTextToSend = messageText.trim();
      setMessageText("");

      // Send to API - this will trigger backend to save to DB and emit socket event
      const response = await sendMessageAPI({
        chatId,
        text: messageTextToSend,
        type: "TEXT",
      }).unwrap();

      console.log("✅ Message sent to API, response:", response);

    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset when chat changes
  useEffect(() => {
    setAllMessages([]);
  }, [chatId]);

  // Debug: Log when allMessages changes
  useEffect(() => {
    console.log("🔄 allMessages updated, count:", allMessages.length);
  }, [allMessages]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">Failed to load chat</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[calc(100vh-128px)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center">
          {activeUser?.participants[0]?.image ? (
            <Image
              src={
                activeUser?.participants[0]?.image
                  ? getImageUrl(activeUser?.participants[0]?.image)
                  : placeholderImg
              }
              alt={activeUser?.participants[0]?.name || "User"}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
          ) : (
            <CircleUserRound className="size-11 mr-3" />
          )}
          <h2 className="font-semibold">
            {activeUser?.participants[0]?.name || "Chat"}
          </h2>
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

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 pb-16"
        style={{
          maxHeight: containerHeight,
          height: containerHeight,
        }}
      >
        {allMessages?.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          allMessages?.map((message, index) => {
            const isMyMessage = message.sender.toString() === myId?.toString();

            return (
              <div
                key={message._id || index}
                className={`flex mb-4 ${
                  isMyMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div>
                  <p
                    className={`text-base leading-relaxed rounded-full py-0.5 px-1.5 ${
                      isMyMessage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 text-gray-500 ${
                      isMyMessage ? "text-right" : "text-left"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white fixed bottom-1 w-[60%] border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0">
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