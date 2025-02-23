import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { useState } from "react";
import SearchBubble from "./SearchBubble";
import EmptyState from "./EmptyState";

const FILTERS = ["All", "Plush", "Figure", "Others"];

function ProductList() {
  const { products, productsDispatch, productActions } = useProducts();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const isEmpty = products.length === 0;

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
        className="flex-grow h-10 font-medium"
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
        <div className="z-1 fixed top-4 left-4 flex w-[calc(100vw-2rem)] h-12 bg-neutral-100 p-1 gap-1 shadow-lg rounded-lg justify-self-center items-center">
          {filterButtons}
        </div>
        <SearchBubble
          activeFilter={activeFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>
      {isEmpty ?
        <EmptyState where="the search result" />
      : <div className="flex flex-wrap justify-center gap-8 gap-y-24 pt-40 pb-22">
          {productList}
        </div>
      }
    </>
  );
}

export default ProductList;
