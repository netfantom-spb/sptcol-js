import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

describe("App component", () => {
  it("renders the ProductsPage component within the Provider", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Assuming ProductsPage contains some identifiable content (page header)
    const productsHeading = screen.getByRole("heading", { name: /products list/i });
    expect(productsHeading).toBeInTheDocument();
  });

});
