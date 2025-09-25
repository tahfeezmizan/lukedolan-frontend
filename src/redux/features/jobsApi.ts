import { baseApi } from "./baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: "/job",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        // console.log(response?.data?.data)
        return response?.data?.data;
      },
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
    }),

    // Update category endpoint
    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/job/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery, useUpdateJobMutation } = jobsApi;
