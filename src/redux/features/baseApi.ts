/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// const baseURL = process.env.PUBLIC_BASEURL as string;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.7.62:5001/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Product",
    "Jobs",
    "Chat",
    "Message",
    "Application",
    "Category",
    "Plan",
    "DashboardStatistics",
  ],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => "/profile",
    }),
  }),
});

export const { useGetProfileQuery } = baseApi;
