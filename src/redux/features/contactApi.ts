import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/contacts",
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: "/contacts",
        method: "POST",
        body: newContact,
      }),
    }),
  }),
});

export const { useGetContactsQuery, useAddContactMutation } = contactApi;
