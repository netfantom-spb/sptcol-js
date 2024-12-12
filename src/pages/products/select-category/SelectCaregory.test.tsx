import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SelectCategory } from "./SelectCategory";

describe("SelectCategory component", () => {
  it("renders all options including default option", () => {
    render(
      <SelectCategory
        items={["Category 1", "Category 2", "Category 3"]}
        selectedItem={null}
        onChangeCategory={vi.fn()}
      />
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4); // Default + 3 categories
    expect(options[0]).toHaveTextContent("Все категории");
    expect(options[1]).toHaveTextContent("Category 1");
    expect(options[2]).toHaveTextContent("Category 2");
    expect(options[3]).toHaveTextContent("Category 3");
  });

  it("shows the selected item as the default value", () => {
    render(
      <SelectCategory
        items={["Category 1", "Category 2"]}
        selectedItem="Category 2"
        onChangeCategory={vi.fn()}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("Category 2");
  });

  it("calls onChangeCategory with the correct value when an option is selected", () => {
    const mockOnChangeCategory = vi.fn();
    render(
      <SelectCategory
        items={["Category 1", "Category 2"]}
        selectedItem={null}
        onChangeCategory={mockOnChangeCategory}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "Category 1" } });

    expect(mockOnChangeCategory).toHaveBeenCalledTimes(1);
    expect(mockOnChangeCategory).toHaveBeenCalledWith("Category 1");
  });

  it("calls onChangeCategory with null when the default option is selected", () => {
    const mockOnChangeCategory = vi.fn();
    render(
      <SelectCategory
        items={["Category 1", "Category 2"]}
        selectedItem="Category 1"
        onChangeCategory={mockOnChangeCategory}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "" } });

    expect(mockOnChangeCategory).toHaveBeenCalledTimes(1);
    expect(mockOnChangeCategory).toHaveBeenCalledWith(null);
  });
});