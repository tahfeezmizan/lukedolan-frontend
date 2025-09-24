import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create user
    createUser: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // verify user
    verifyUser: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // verify user
    resendOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // forgot password
    forgotPassword: builder.mutation({
      query: (data) => {
        console.log("Forget Password", data);

        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // reset password
    resetPassword: builder.mutation({
      query: ({ id, password, headers }) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: { id, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    // get user
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getLoggedInUser: builder.query({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),

      transformResponse: (response: any) => response.data,
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendOTPMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useGetLoggedInUserQuery,
  useGetUserByIdQuery,
} = authApi;
