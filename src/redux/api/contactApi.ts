import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (data) => ({
        url: "/contact/send-email",
        method: "POST",
        body: data,
      }),
    }),

    getSentContacts: builder.query({
      query: () => ({
        url: "/contact/sent-contacts",
        method: "GET",
      }),
    }),

    getReceivedContacts: builder.query({
      query: () => ({
        url: "/contact/received-contacts",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetSentContactsQuery,
  useGetReceivedContactsQuery,
} = contactApi;
export default contactApi;
