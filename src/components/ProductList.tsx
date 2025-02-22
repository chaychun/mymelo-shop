import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { useState } from "react";
import SearchBubble from "./SearchBubble";

const FILTERS = ["All", "Plush", "Figure", "Others"];

function ProductList() {
  const { products, productsDispatch, productActions } = useProducts();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filterButtons = FILTERS.map((filter) => {
    return (
      <Button
        key={filter}
        variant={activeFilter === filter ? "filterActive" : "filterInactive"}
        onPress={() => {
          setActiveFilter(filter);
          productsDispatch({
            type: productActions.UPDATE_FILTER,
            filter: filter.toUpperCase(),
            searchTerm: searchTerm,
          });
        }}
        className="flex-grow"
      >
        {filter}
      </Button>
    );
  });

  const productList = products.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <>
      <header className="flex flex-wrap gap-8 justify-center items-center">
        <div className="flex w-88 bg-neutral-50 p-1 gap-1 shadow-md rounded-lg justify-self-center h-11 items-center">
          {filterButtons}
        </div>
        <SearchBubble
          activeFilter={activeFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>
      <div className="flex flex-wrap justify-center gap-8 gap-y-24 pt-24">
        {productList}
      </div>
    </>
  );
}

export default ProductList;
