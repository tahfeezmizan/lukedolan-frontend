/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => ({
                url: "/job",
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response: any) => {
                return response?.data?.data;
            },
        }),

        // Get single job
        getSingleJob: builder.query({
            query: ({ id }) => ({
                url: `/job/${id}`,
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response: any) => {
                return response?.data;
            },
        }),

        createJob: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data,
            }),
        }),


        updateJob: builder.mutation({
            query: ({ id, data }) => ({
                url: `/job/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        deleteJob: builder.mutation({
            query: (id) => {
                console.log("Deleting job with ID:", id);
                return {
                    url: `/job/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Jobs"],
        }),
        getAllJobswithStatics: builder.query({
            query: () => ({
                url: "/job",
                method: "GET",
            }),
            providesTags: ["Jobs"],
            transformResponse: (response: any) => {
                return response?.data;
            },
        }),
        getFilterdJobs: builder.query({
            query: (filters?: { searchTerm?: string; jobLocation?: string; category?: string; type?: string; minSalary?: number; maxSalary?: number; page?: number; limit?: number }) => {
                const params = new URLSearchParams();

                if (filters?.searchTerm) params.append("searchTerm", filters.searchTerm);
                if (filters?.jobLocation) params.append("jobLocation", filters.jobLocation);
                if (filters?.category) params.append("category", filters.category);
                if (filters?.type) params.append("type", filters.type);
                if (filters?.minSalary !== undefined) params.append("minSalary", filters.minSalary.toString());
                if (filters?.maxSalary !== undefined) params.append("maxSalary", filters.maxSalary.toString());
                if (filters?.page) params.append("page", filters.page.toString());
                if (filters?.limit) params.append("limit", filters.limit.toString());

                return {
                    url: `/job${params.toString() ? `?${params.toString()}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["Jobs"],
            transformResponse: (response: any) => {
                // Return the entire response including meta data
                return response?.data;
            },
        }),
    }),
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery, useGetSingleJobQuery, useUpdateJobMutation, useDeleteJobMutation, useGetAllJobswithStaticsQuery, useGetFilterdJobsQuery } = jobsApi;
