import { useState } from "react";
import ProductList from "./components/ProductList";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart } from "lucide-react";

function App() {
  const [inCartView, setInCartView] = useState(false);

  const pageChangeButton = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setInCartView(!inCartView)}
      className="z-1 fixed bottom-4 left-4 flex items-center justify-center w-16 h-16 text-white bg-primary rounded-lg shadow-lg hover:bg-neutral-800 transition-colors cursor-pointer"
    >
      {inCartView ?
        <ShoppingBag size={32} />
      : <ShoppingCart size={32} />}
    </motion.button>
  );

  return (
    <ProductsProvider>
      <CartProvider>
        <main className="h-full p-20">
          {pageChangeButton}
          <ProductList />
        </main>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
