import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query<DashboardStatisticsResponse, { year?: number } | void>({
            query: ({ year } = {}) => ({
                url: "/dashboard/statistics",
                method: "GET",
                params: {
                    ...(year && { year }),
                },
            }),
            providesTags: ["DashboardStatistics"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetStatisticsQuery } = dashboardApi;

export interface DashboardStatisticsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        users: {
            totalUsers: number;
            totalRecruiters: number;
            totalApplicants: number;
        };
        jobs: {
            totalJobs: number;
        };
        applications: {
            totalApplications: number;
        };
        subscriptions: {
            totalSubscriptions: number;
            activeSubscriptions: number;
            expiredSubscriptions: number;
            failedSubscriptions: number;
            totalRevenue: number;
        };
        monthlyRevenue: {
            month: number;
            monthName: string;
            revenue: number;
            count: number;
            year: number;
        }[];
    };
}
