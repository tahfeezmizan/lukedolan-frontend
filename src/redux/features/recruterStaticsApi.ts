import { baseApi } from "./baseApi";

export const recruiterDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecruiterStatistics: builder.query<RecruiterDashboardStatisticsResponse, void>({
            query: () => ({
                url: "/dashboard/recruter-statistics",
                method: "GET",
            }),
            providesTags: ["RecruiterDashboardStatistics"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetRecruiterStatisticsQuery } = recruiterDashboardApi;

// --- Types ---
export interface RecruiterDashboardStatisticsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        totalJobs: number;
        totalApplications: number;
        totalChats: number;
    };
}
