import { baseApi } from "./baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: "/job",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
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
