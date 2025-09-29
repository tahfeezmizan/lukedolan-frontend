// In talentApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const talentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredTalents: builder.query({
      query: (filters?: {
        searchTerm?: string;
        location?: string;
        gender?: string;
        skills?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm)
          params.append("searchTerm", filters.searchTerm);
        if (filters?.location) params.append("location", filters.location);
        if (filters?.gender) params.append("gender", filters.gender);
        if (filters?.skills) params.append("skills", filters.skills);
        if (filters?.page) params.append("page", filters.page.toString());
        if (filters?.limit) params.append("limit", filters.limit.toString());

        return {
          url: `/user/applicants${
            params.toString() ? `?${params.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["Talents"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
  }),
});

export const { useGetFilteredTalentsQuery } = talentApi;
