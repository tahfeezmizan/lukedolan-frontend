/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllUser
        getAllUser: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/user?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),

        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["Auth"],
            transformResponse: (response: any) => {
                return response?.data;
            },
        }),

        UpdateMe: builder.mutation({
            query: ({ body }) => {
                console.log("UpdateMe body:", body);
                return {
                    url: "/user/update-me",
                    method: "PUT",
                    body,
                };
            },
        }),

        UpdateProfile: builder.mutation({
            query: ({ body }) => {
                console.log("UpdateProfile body:", body);
                return {
                    url: "/user/profile",
                    method: "PATCH",
                    body,
                };
            },
        }),
        AddWorkExperience: builder.mutation({
            query: ({ body }) => {
                console.log("AddWorkExperience body:", body);
                return {
                    url: "/user/profile/work-experience",
                    method: "POST",
                    body,
                };
            },
        }),
        DeleteWorkExperience: builder.mutation({
            query: ({ index }) => ({
                url: `/user/profile/work-experience/${index}`,
                method: "DELETE",
            }),
        }),

        // Update specific work experience by index
        UpdateWorkExperience: builder.mutation({
            query: ({ index, body }) => {
                console.log("UpdateWorkExperience index:", index, "body:", body);
                return {
                    url: `/user/profile/work-experience/${index}`,
                    method: "PUT",
                    body,
                };
            },
        }),
        // Delete specific education by index
        DeleteEducation: builder.mutation({
            query: ({ index }) => {
                console.log("DeleteEducation index:", index);
                return {
                    url: `/user/profile/education/${index}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});
export const { useUpdateMeMutation, useGetMeQuery, useGetAllUserQuery, useUpdateProfileMutation, useDeleteWorkExperienceMutation, useDeleteEducationMutation, useAddWorkExperienceMutation, useUpdateWorkExperienceMutation } = userApi;
