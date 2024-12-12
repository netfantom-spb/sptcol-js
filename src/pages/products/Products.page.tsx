import React, { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "@/redux/services/fakestoreapi.service";
import { ProductsTable } from "./features/products-table/ProductsTable";
import { Form, Spinner } from "react-bootstrap";
import { SelectCategory } from "./select-category/SelectCategory";

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null),
    [filterText, setFilterText] = useState("");

  const { data: categories, isLoading: isLoadingCategories } =
      useGetAllCategoriesQuery(),
    { data: products, isFetching: productsFetching } =
      useGetProductsByCategoryQuery(selectedCategory || undefined);

  return (
    <>
      <h1>Products list</h1>
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
      {products && (
        <ProductsTable
          items={products}
          filterText={filterText || null}
          itemsPerPage={5}
        />
      )}
      {products && products.length == 0 && (
        <div>No products available</div>
      )}
      {(isLoadingCategories || productsFetching) && (
        <div className="m-5">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};
