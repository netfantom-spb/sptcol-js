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

    // Assuming ProductsPage contains some identifiable content, like a heading
    const productsHeading = screen.getByRole("heading", { name: /products list/i });
    expect(productsHeading).toBeInTheDocument();
  });

  // it("connects to the Redux store without errors", () => {
  //   render(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   );

  //   // Check if the store provides content that ProductsPage might depend on
  //   // For instance, ProductsPage might render some default product list or message
  //   const defaultContent = screen.getByText(/no products available/i, { exact: false });
  //   expect(defaultContent).toBeInTheDocument();
  // });
});
