/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

// Type for a Plan
export type PlanData = {
    _id: string;
    title: string;
    description?: string;
    price: number;
    duration: string; // "1 month" | "1 year"
    paymentType?: string;
    features?: string[];
    status?: "Active" | "Inactive";
    productId?: string;
    paymentLink?: string;
    priceId?: string;
    createdAt?: string;
    updatedAt?: string;
};

export const planApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all plans
        getPlans: builder.query<PlanData[], void>({
            query: () => ({
                url: "/plan",
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data ?? [],
            providesTags: ["Plan"],
        }),

        // GET plan by ID
        getPlanById: builder.query<PlanData, string>({
            query: (id) => ({
                url: `/plan/${id}`,
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data,
            providesTags: ["Plan"],
        }),

        // POST create plan
        createPlan: builder.mutation<PlanData, Omit<PlanData, "_id">>({
            query: (body) => ({
                url: "/plan",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Plan"],
        }),

        // PATCH update plan
        updatePlan: builder.mutation<PlanData, { id: string; data: Partial<PlanData> }>({
            query: ({ id, data }) => ({
                url: `/plan/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Plan"],
        }),

        // DELETE plan
        deletePlan: builder.mutation<void, string>({
            query: (id) => ({
                url: `/plan/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Plan"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetPlansQuery, useGetPlanByIdQuery, useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation } = planApi;
