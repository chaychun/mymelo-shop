import { useState } from "react";
import ProductList from "./components/ProductList";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import CartPage from "./components/CartPage";

function App() {
  const [inCartView, setInCartView] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const pageChangeButton = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setInCartView(!inCartView)}
      className="z-1 fixed bottom-4 left-4 flex items-center justify-center w-14 h-14 text-white bg-rose-400 rounded-lg shadow-lg shadow-rose-600/50 hover:bg-rose-500 transition-colors cursor-pointer"
    >
      {inCartView ?
        <ShoppingBag size={28} />
      : <ShoppingCart size={28} />}
    </motion.button>
  );

  return (
    <ProductsProvider>
      <CartProvider>
        <main className="min-h-screen bg-gradient-to-b from-pink-200 to-pink-50 bg-fixed">
          {!isOrdered && pageChangeButton}
          {inCartView ?
            <CartPage
              setInCartView={setInCartView}
              isOrdered={isOrdered}
              setIsOrdered={setIsOrdered}
            />
          : <ProductList />}
        </main>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
