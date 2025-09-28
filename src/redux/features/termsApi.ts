/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

// Type for Terms & Conditions
export type TermsData = {
    content: string;
    type: "terms-and-condition";
    createdAt?: string;
    updatedAt?: string;
};

export const termsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /public/terms-and-condition
        getTerms: builder.query<TermsData, void>({
            query: () => ({
                url: "/public/terms-and-condition",
                method: "GET",
            }),
            transformResponse: (response: any) => response?.data,
        }),

        // POST /public
        createTerms: builder.mutation<TermsData, TermsData>({
            query: (body) => ({
                url: "/public",
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetTermsQuery, useCreateTermsMutation } = termsApi;
