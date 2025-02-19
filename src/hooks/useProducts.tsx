import { useContext } from "react";
import ProductContext from "@/contexts/ProductsContext";
import { ProductsContextType } from "@/contexts/ProductsContext";

export default function useProducts(): ProductsContextType {
  return useContext(ProductContext);
}
