// productApi.ts

import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ category = "" }: any = {}) => ({
        url: category ? `/product?category=${category}` : "/product",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data.products;
      },
    }),
    getMyProducts: builder.query({
      query: () => ({
        url: "/product/my-products",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data.products;
      },
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    getProductDetails: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (newProductData) => {
        console.log("newProductData body:", newProductData);

        return {
          url: "/product/create-products",
          method: "POST",
          body: newProductData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useGetMyProductsQuery,
  useGetSingleProductQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
} = productApi;

export default productApi;
