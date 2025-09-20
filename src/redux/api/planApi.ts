import { GitPullRequestCreate } from "lucide-react";
import { baseApi } from "./baseApi";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...
    getAllPlans: builder.query({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/create",
        method: "POST",
        body: data,
      }),
    }),

    // /subscription/create
  }),
});

export const { useGetAllPlansQuery, useCreateSubscriptionMutation } = planApi;
