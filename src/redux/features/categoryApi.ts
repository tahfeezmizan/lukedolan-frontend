import { baseApi } from "./baseApi";

// Single category item
interface Category {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Pagination meta
interface CategoryMeta {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
}

// Full API response
interface CategoryResponseType {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        data: Category[];
        meta: CategoryMeta;
    };
}

interface GetCategoryParams {
    page?: number;
    limit?: number;
}

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create category endpoint
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        // get category endpoint
        getCategory: builder.query<CategoryResponseType, GetCategoryParams>({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `/category?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Category"],
        }),

        // Update category endpoint
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        // Delete category endpoint
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;
