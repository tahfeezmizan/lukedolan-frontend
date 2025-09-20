import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUser
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    UpdateMe: builder.mutation({
      query: ({ body }) => {
        console.log("UpdateMe body:", body); // ✅ Log inside query
        return {
          url: "/user/update-me",
          method: "PUT",
          body,
        };
      },
    }),

    sendVerifiedReqest: builder.mutation({
      query: (body) => {
        return {
          url: "/user/sent-verify",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});
export const { useUpdateMeMutation, useSendVerifiedReqestMutation, useGetAllUserQuery } = userApi;
