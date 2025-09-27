// src/redux/features/chatApi.js
import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create chat
    createChat: builder.mutation({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat"],
    }),

    //  Get all chats
    getChats: builder.query({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    // Get messages for a specific chat
    getMessages: builder.query({
      query: (chatId: string) => ({
        url: `/message/${chatId}`,
        method: "GET",
      }),
      providesTags: (result, error, chatId) => [
        { type: "Message", id: chatId },
        { type: "Chat", id: chatId }
      ],
    }),

    // Send a new message
    sendMessage: builder.mutation({
      query: ({ chatId, text, type = "TEXT", sender }) => ({
        url: "/message",
        method: "POST",
        body: { chatId, text, type, sender },
      }),
      // Invalidate the messages cache for this specific chat
      invalidatesTags: (result, error, { chatId }) => [
        // { type: "Message", id: chatId },
        // { type: "Chat", id: chatId },
        "Chat" // Also invalidate general chat list
      ],
    }),
  }),
});

export const { 
  useCreateChatMutation, 
  useGetChatsQuery, 
  useGetMessagesQuery, 
  useSendMessageMutation 
} = chatApi;