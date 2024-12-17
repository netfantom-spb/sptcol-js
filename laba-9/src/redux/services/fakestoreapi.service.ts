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
    // Get products (optional by category)
    getProductsByCategory: builder.query<ProductDto[], string | undefined>({
      query: (category) => ({
        url: category ? `/products/category/${category}` : '/products',
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
  useGetProductsByCategoryQuery,
} = fakeStoreApi;
