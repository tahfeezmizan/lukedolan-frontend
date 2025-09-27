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

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),

    UpdateMe: builder.mutation({
      query: ({ body }) => {
        console.log("UpdateMe body:", body);
        return {
          url: "/user/update-me",
          method: "PUT",
          body,
        };
      },
    }),

    UpdateProfile: builder.mutation({
      query: ({ body }) => {
        console.log("UpdateProfile body:", body);
        return {
          url: "/user/profile",
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});
export const {
  useUpdateMeMutation,
  useGetAllUserQuery,
  useUpdateProfileMutation,
  useGetMeQuery,
} = userApi;
