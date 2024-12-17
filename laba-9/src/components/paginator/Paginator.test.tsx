import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Paginator } from "./Paginator";

describe("Paginator component", () => {
  it("renders the correct number of pages", () => {
    render(
      <Paginator
        itemsCount={50}
        itemsPerPage={10}
        activePage={1}
        onChangePage={vi.fn()}
      />
    );

    const pageItems = screen.getAllByRole("listitem");
    expect(pageItems).toHaveLength(5); // 50 / 10 = 5 pages
  });

  it("highlights the active page", () => {
    render(
      <Paginator
        itemsCount={50}
        itemsPerPage={10}
        activePage={3}
        onChangePage={vi.fn()}
      />
    );

    const activePage = screen.getByText("3").closest("li");
    expect(activePage).toHaveClass("active");
  });

  it("calls onChangePage with the correct value when a page is clicked", () => {
    const mockOnChangePage = vi.fn();
    render(
      <Paginator
        itemsCount={50}
        itemsPerPage={10}
        activePage={1}
        onChangePage={mockOnChangePage}
      />
    );

    const secondPage = screen.getByRole("button", { name: "2" });
    fireEvent.click(secondPage);

    expect(mockOnChangePage).toHaveBeenCalledTimes(1);
    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });

  it("adjusts active page if it exceeds the total pages", () => {
    const mockOnChangePage = vi.fn();
    render(
      <Paginator
        itemsCount={15}
        itemsPerPage={10}
        activePage={3} // Non-existent page is specified
        onChangePage={mockOnChangePage}
      />
    );

    expect(mockOnChangePage).toHaveBeenCalledWith(2); // Should navigate to the last existing page
  });

  it("renders no pages if itemsCount is 0", () => {
    render(
      <Paginator
        itemsCount={0}
        itemsPerPage={10}
        activePage={1}
        onChangePage={vi.fn()}
      />
    );

    const pageItems = screen.queryAllByRole("button");
    expect(pageItems).toHaveLength(0);
  });
});