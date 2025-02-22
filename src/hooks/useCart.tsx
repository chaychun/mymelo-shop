import { useContext } from "react";
import CartContext from "@/contexts/CartContext";
import { CartContextType } from "@/contexts/CartContext";

export default function useCart(): CartContextType {
  return useContext(CartContext);
}
