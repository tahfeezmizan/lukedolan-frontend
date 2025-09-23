import { baseApi } from "./baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: "/job",
        method: "GET",
      }),
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery } = jobsApi;
