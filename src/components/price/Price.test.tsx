import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Price } from "./Price"; // Предполагается, что компонент находится в этом же каталоге

describe("Price component", () => {
  it("renders formatted value when 'value' prop is provided", () => {
    render(<Price value={1234.56} />);

    expect(screen.getByText("1,234.56")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders formatted value from children if 'value' prop is not provided", () => {
    render(<Price>789.01</Price>);

    expect(screen.getByText("789.01")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("defaults to 0 if neither 'value' prop nor children are provided", () => {
    render(<Price />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("formats large numbers correctly", () => {
    render(<Price value={1234567.89} />);

    expect(screen.getByText("1,234,567.89")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });
});
