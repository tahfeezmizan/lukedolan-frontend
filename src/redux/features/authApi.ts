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
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendOTPMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
