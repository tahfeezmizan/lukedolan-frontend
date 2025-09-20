import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create user
    createUser: build.mutation({
      query: (data) => ({
        url: `/user/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    // verify user
    verifyUser: build.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    // verify email
    verifyEmail: build.mutation({
      query: (data) => {
      console.log("Token in api endpoint:", data.token);
      return {
        url: "/auth/verify-email",
        method: "POST",
        body: { userId: data.userId },
        headers: {
        Authorization: `${data.token}`,
        },
      };
      },
      invalidatesTags: ["Auth"],
    }),
    // login user
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // logout user
    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // forgot password
    forgotPassword: build.mutation({
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
    resetPassword: build.mutation({
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
    getUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getLoggedInUser: build.query({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),

      transformResponse: (response: any) => response.data,
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    // // update user
    // updateUser: build.mutation({
    //   query: ({ formData, id }) => ({
    //     url: `/users/${id}`,
    //     method: "PUT",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useVerifyEmailMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useGetLoggedInUserQuery,
  useGetUserByIdQuery,
} = authApi;
