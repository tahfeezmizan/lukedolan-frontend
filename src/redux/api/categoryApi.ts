import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
