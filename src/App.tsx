import ProductList from "./components/ProductList";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <main className="h-full p-20 scrollbar-hide">
          <ProductList />
        </main>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
