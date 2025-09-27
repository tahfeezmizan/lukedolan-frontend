import { baseApi } from "./baseApi";

const applicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        //get applied jobs
        getAppliedJobs: builder.query({
            query: () => ({
                url: "/application",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                
                return response?.data?.data;
            },
        }),

    })
});

export const { useGetAppliedJobsQuery } = applicationApi;