import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASEAPI = process.env.NEXT_PUBLIC_BASEURL;

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEAPI,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", ` ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Auth",
    "Product",
  ],
});
export const {} = baseApi;
