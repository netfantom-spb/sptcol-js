import React, { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} from "@/redux/services/fakestoreapi.service";
import { skipToken } from "@reduxjs/toolkit/query";
import { ProductsTable } from "./features/products-table/ProductsTable";
import { Form, Spinner } from "react-bootstrap";
import { SelectCategory } from "./select-category/SelectCategory";

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null),
    [filterText, setFilterText] = useState('');

  const { data: categories, isLoading: isLoadingCategories } =
      useGetAllCategoriesQuery(),
    { data: allProducts, isLoading: isLoadingProducts } =
      useGetAllProductsQuery(),
    { data: productsInCategory, isFetching: productsInCategoryFetching } =
      useGetProductsByCategoryQuery(selectedCategory || skipToken);

    //   console.log((selectedCategory ? productsInCategory : allProducts));
  return (
    <>
      <h1>Test store</h1>
      <div className="d-flex my-3 gap-3">
        <div>
          <SelectCategory
            items={categories || []}
            selectedItem={selectedCategory}
            onChangeCategory={(value) => setSelectedCategory(value)}
          />
        </div>
        <div>
          <Form.Control
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </div>
      </div>
      {allProducts && (
        <ProductsTable
          items={(selectedCategory ? productsInCategory : allProducts) || []}
          filterText={filterText || null}
          itemsPerPage={5}
        />
      )}
      {(isLoadingCategories ||
        isLoadingProducts ||
        productsInCategoryFetching) && (
        <div className="m-5">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};
