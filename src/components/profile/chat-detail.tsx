"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle } from "lucide-react";
import io, { Socket } from "socket.io-client";
import placeholderImg from "@/assets/telent-person.png";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/chatAPI";
import { useGetUserQuery } from "@/redux/features/userApi";
import { PageLoading } from "../shared/page-loading";
import { InfiniteScrollLoaderPresets } from "../shared/infinite-scroll-loader";
import { useInfiniteScroll } from "../shared/use-infinite-scroll";
import { getImageUrl } from "@/lib/utils";

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
}

interface ScrollState {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

export default function ChatDetail() {
  const params = useParams();
  const { id } = params;
  const chatId = id as string;
  const { data: userData } = useGetUserQuery(undefined);
  const myId = userData?.data?._id;
   
  console.log(myId)

  // State management
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [containerHeight, setContainerHeight] = useState<string>("100vh");

  // RTK Query for messages with dynamic page
  const { data, isLoading, isError, error } = useGetMessagesQuery(
    { chatId, page: currentPage, limit: 10 },
    { skip: !chatId }
  );
  console.log("data:", data);
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isScrollingToBottom = useRef(false);

  // Request management to prevent race conditions
  const requestIdRef = useRef(0);
  const lastRequestTimeRef = useRef(0);

  // Debounced load more function for infinite scroll
  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && !isInitialLoad) {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTimeRef.current;

      // Debounce: prevent requests within 500ms of each other
      if (timeSinceLastRequest < 500) {
        return;
      }

      console.log("Loading more messages - Page:", currentPage + 1);

      // Update request tracking
      requestIdRef.current += 1;
      lastRequestTimeRef.current = now;

      setIsLoadingMore(true);
      setLoadingError(null);
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoadingMore, hasMore, isInitialLoad, currentPage]);

  // Optimized infinite scroll hook
  const {
    sentinelRef: triggerRef,
    containerRef,
    scrollToBottom,
    maintainScrollPosition,
  } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: handleLoadMore,
    threshold: 0.1,
    rootMargin: "50px",
    debounceMs: 200,
  });

  // Socket connection
  const socket: Socket = useMemo(() => io("http://10.10.7.62:5001"), []);
  const [sendMessageAPI] = useSendMessageMutation();
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Dynamic height management for responsive design
  useEffect(() => {
    const updateContainerHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80; // Approximate header height
      const inputHeight = 80; // Approximate input area height
      const availableHeight = viewportHeight - headerHeight - inputHeight;

      setContainerHeight(`${Math.max(availableHeight, 300)}px`);
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  // Optimized retry handler for failed loads with request tracking
  const handleRetryLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      // Reset request tracking for retry
      requestIdRef.current += 1;
      lastRequestTimeRef.current = Date.now();

      setLoadingError(null);
      setIsLoadingMore(true);
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoadingMore, hasMore]);

  // Update messages when data changes
  useEffect(() => {
    if (data?.data) {
      console.log(
        "Data received - Page:",
        currentPage,
        "Messages:",
        data.data.messages?.length
      );

      if (currentPage === 1) {
        // Initial load
        setAllMessages(data.data.messages || []);
        setIsInitialLoad(false);
        isScrollingToBottom.current = true;
      } else {
        // Infinite scroll load - maintain scroll position
        setAllMessages((prev) => {
          const newMessages = data.data.messages || [];
          const existingIds = new Set(prev.map((msg) => msg._id));
          const uniqueNewMessages = newMessages.filter(
            (msg: Message) => !existingIds.has(msg._id)
          );
          return [...uniqueNewMessages, ...prev];
        });

        // Maintain scroll position after loading new messages
        setTimeout(() => {
          maintainScrollPosition();
        }, 50);
      }

      // Update pagination state
      const pagination = data.data.pagination;
      if (pagination) {
        setHasMore(pagination.totalPage > currentPage);
      } else {
        setHasMore(false);
      }

      setIsLoadingMore(false);
      setLoadingError(null);
    }
  }, [data, currentPage, maintainScrollPosition]);

  // Enhanced API error handling with request tracking
  useEffect(() => {
    if (isError && error) {
      console.error("Messages API error:", error);

      // Only handle error if it's for the current request
      const currentRequestId = requestIdRef.current;

      setTimeout(() => {
        // Check if this is still the current request
        if (requestIdRef.current === currentRequestId) {
          setIsLoadingMore(false);
          setLoadingError("Failed to load messages. Please try again.");
        }
      }, 100); // Small delay to prevent race conditions
    }
  }, [isError, error]);

  // Enhanced scroll to bottom for initial load and new messages
  useEffect(() => {
    if (isScrollingToBottom.current && allMessages.length > 0) {
      // Use the optimized scroll function
      scrollToBottom();
      isScrollingToBottom.current = false;
    }
  }, [allMessages, scrollToBottom]);

  // Optimized initial scroll positioning
  useEffect(() => {
    if (!isInitialLoad && currentPage === 1 && allMessages.length > 0) {
      const container = containerRef.current;
      if (container && messagesEndRef.current) {
        // Single, smooth scroll to bottom after initial messages are loaded
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "auto",
            });
          });
        });
      }
    }
  }, [isInitialLoad, allMessages.length, currentPage]);

  // Socket events
  useEffect(() => {
    if (!chatId || !socket) return;

    socket.on("connect", () => setIsSocketConnected(true));
    socket.on("disconnect", () => setIsSocketConnected(false));

    const receiveMessageHandler = (newMessage: Message) => {
      setAllMessages((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) return prev;

        const updatedMessages = [...prev, newMessage];

        // Optimized auto-scroll to bottom for new messages
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container && messagesEndRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            if (isNearBottom) {
              // Smooth scroll to bottom
              container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
              });
            }
          }
        });

        return updatedMessages;
      });
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

      // Optimized scroll to bottom after sending message
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
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
    setCurrentPage(1);
    setAllMessages([]);
    setHasMore(true);
    setIsInitialLoad(true);
    setIsLoadingMore(false);
    setLoadingError(null);
    isScrollingToBottom.current = false;
  }, [chatId]);

  if (isLoading && isInitialLoad) {
    return <PageLoading />;
  }

  if (isError && isInitialLoad) {
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

  const participant = data?.data?.participant || {};

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[calc(100vh-128px)]">
      {/* Header - fixed height */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center">
          <Image
            src={getImageUrl(participant.image || placeholderImg)}
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

      {/* Messages Container - scrollable area with dynamic height */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 pb-16 "
        style={{
          scrollBehavior: "auto",
          maxHeight: containerHeight,
          height: containerHeight,
        }}
      >
        {/* Intersection Observer trigger for infinite scroll */}
        <div ref={triggerRef} className="h-1 " />

        {/* Loading indicator for infinite scroll */}
        <InfiniteScrollLoaderPresets.Chat isLoading={isLoadingMore} />

        {/* Error indicator for infinite scroll */}
        <InfiniteScrollLoaderPresets.Chat
          hasError={!!loadingError}
          errorMessage={loadingError || undefined}
          onRetry={handleRetryLoadMore}
        />

        {/* No more messages indicator */}
        <InfiniteScrollLoaderPresets.Chat
          showNoMoreData={!hasMore && allMessages.length > 0 && !isInitialLoad}
        />

        {/* Messages */}
        {allMessages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          allMessages.map((message) => {
            console.log(message);
            const isMyMessage = message.sender.toString() === myId.toString();

            console.log("isMyMessage:", isMyMessage, message.sender, myId);
            return (
              <div
                key={message._id}
                className={`flex mb-4  ${
                  isMyMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    isMyMessage
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm break-words leading-relaxed">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      isMyMessage ? "text-blue-100" : "text-gray-500"
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

      {/* Input - fixed height */}
      <div className="bg-white fixed  bottom-1 w-[60%]  border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0">
        <Input
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={!isSocketConnected}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!messageText.trim() || !isSocketConnected}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
