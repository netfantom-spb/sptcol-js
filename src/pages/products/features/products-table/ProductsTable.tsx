import React, { useState } from "react";
import { ProductDto } from "@/redux/dto/product.dto";
import { Price } from "@/components/Price/Price";
import { Paginator } from "@/components/paginator/Paginator";

interface ProductsTableProps {
  items: ProductDto[];
  itemsPerPage?: number;
  filterText: string | null;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  items,
  itemsPerPage = 10,
  filterText,
}) => {
  const [activePage, setActivePage] = useState(1);
    console.log('render ProductsTable')
  const filteredItems = filterText
    ? items.filter((item) => {
        const re = new RegExp(filterText, "i");
        return re.test(item.title);
      })
    : items;

  const itemsOnPage = filteredItems.slice(
    itemsPerPage * (activePage - 1),
    itemsPerPage * activePage
  );

  return (
    <div className="d-flex flex-column gap-3">
      <div className="align-self-end">
        <Paginator
          itemsCount={filteredItems.length}
          itemsPerPage={itemsPerPage}
          activePage={activePage}
          onChangePage={(value) => setActivePage(value)}
        />
      </div>
      <div className="d-flex flex-column gap-5">
        {itemsOnPage.map(
          ({ id, title, category, price, image, description }) => (
            <div className="d-flex flex-column" key={id}>
              <div className="d-flex">
                <div className="fw-bold flex-grow-1 text-start">{title}</div>
                <div className="fw-bold">{category} </div>
              </div>
              <div className="d-flex flex-row mt-2">
                <div className="flex-shrink-0 pt-4" style={{ width: "120px" }}>
                  <img src={image} width={100} />
                </div>
                <div className="flex-grow-1 p-5">{description}</div>
                <div>
                  <Price value={price} />
                </div>
              </div>
            </div>
          )
        )}
        {/* {itemsOnPage.length === 0 && (
          <div className="place-items-center">Ничего не найдено</div>
        )} */}
      </div>
      <div className="align-self-end">
        <Paginator
          itemsCount={filteredItems.length}
          itemsPerPage={itemsPerPage}
          activePage={activePage}
          onChangePage={(value) => setActivePage(value)}
        />
      </div>
    </div>
  );
};
