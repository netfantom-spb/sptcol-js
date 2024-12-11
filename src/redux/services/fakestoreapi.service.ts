import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesDto } from "../dto/categories.dto";
import { ProductDto } from "../dto/product.dto";

export const fakeStoreApi = createApi({
  reducerPath: "rcrApi",
  tagTypes: ["Categories", "Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query<CategoriesDto, void>({
      query: () => ({ url: "/products/categories", timeout: 5000 }),
      providesTags: ["Categories"],
    }),
    // Get all products
    getAllProducts: builder.query<ProductDto[], void>({
      query: () => ({ url: "/products", timeout: 5000 }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id } as const)),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // Get products by category
    getProductsByCategory: builder.query<ProductDto[], string>({
      query: (category) => ({
        url: `/products/category/${category}`,
        timeout: 5000,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id } as const)),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} = fakeStoreApi;
