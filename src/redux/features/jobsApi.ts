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
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
