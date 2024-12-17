import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";

interface PaginatorProps {
  itemsCount: number;
  itemsPerPage: number;
  activePage: number;
  onChangePage: (value: number) => void;
}
export const Paginator: React.FC<PaginatorProps> = ({
  itemsCount,
  itemsPerPage,
  activePage,
  onChangePage,
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  useEffect(() => {
    if (activePage > pagesCount) {
      onChangePage(pagesCount || 1);
    }
  }, [itemsCount, itemsPerPage, activePage, onChangePage]);

  return (
    <Pagination>
      {pages.map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={pageNum === activePage}
          onClick={() => onChangePage(pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};
