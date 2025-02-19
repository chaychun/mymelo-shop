import ProductList from "./components/ProductList";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <main className="h-full p-20 scrollbar-hide">
        <ProductList />
      </main>
    </ProductsProvider>
  );
}

export default App;
