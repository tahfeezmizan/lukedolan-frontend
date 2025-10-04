/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (data) => ({
        url: `/application`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),
    getApplication: builder.query({
      query: () => ({
        url: "/application",
        method: "GET",
      }),
      providesTags: ["Application"],
      transformResponse: (response: any) => {
        return response?.data?.data;
      },
    }),
  }),
});

export const { useApplyJobMutation, useGetApplicationQuery } = applicationApi;
