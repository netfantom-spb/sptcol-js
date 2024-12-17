import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsPage } from "./pages/products/Products.page";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ProductsPage />
    </Provider>
  );
}

export default App;
