import { ReactElement, createContext, useMemo, useReducer } from "react";

const FILTERS = {
  ALL: "ALL",
  PLUSH: "PLUSH",
  FIGURE: "FIGURE",
  OTHERS: "OTHERS",
};

const ACTIONS = {
  UPDATE_FILTER: "UPDATE_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
};

type ActionType = {
  type: string;
  filter: string;
  searchTerm?: string;
};

export type ProductType = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const initProducts: ProductType[] = [
  {
    id: "001",
    name: "Pink Jumper My Melody Figure",
    category: "FIGURE",
    price: 500,
  },
  {
    id: "002",
    name: "My Melody Strawberry Cake",
    category: "PLUSH",
    price: 1200,
  },
  {
    id: "003",
    name: "Baby My Melody Makeup Bag",
    category: "OTHERS",
    price: 400,
  },
  {
    id: "004",
    name: "Rose Fairy My Melody",
    category: "PLUSH",
    price: 1000,
  },
  {
    id: "005",
    name: "Violet Fairy My Melody",
    category: "PLUSH",
    price: 1000,
  },
  {
    id: "006",
    name: "Pink Macaron My Melody",
    category: "FIGURE",
    price: 650,
  },
  {
    id: "007",
    name: "White Cat Princess My Melody",
    category: "PLUSH",
    price: 1400,
  },
];

// TODO: Implement actions
function productsReducer(_: ProductType[], action: ActionType): ProductType[] {
  switch (action.type) {
    case ACTIONS.UPDATE_FILTER: {
      let filteredProducts: ProductType[];
      const searchTerm = action.searchTerm?.toLowerCase() ?? "";

      if (action.filter === "ALL") {
        filteredProducts = initProducts.filter((product) => {
          return product.name.toLowerCase().includes(searchTerm);
        });
      } else if (
        action.filter === FILTERS.PLUSH ||
        action.filter === FILTERS.FIGURE ||
        action.filter === FILTERS.OTHERS
      ) {
        filteredProducts = initProducts.filter((product) => {
          return (
            product.category === action.filter &&
            product.name.toLowerCase().includes(searchTerm)
          );
        });
      } else {
        throw new Error(
          `Invalid filter category. Must be one of ALL, FIGURE, PLUSH, OTHERS. Got ${action.filter}`,
        );
      }
      return filteredProducts;
    }
    case ACTIONS.CLEAR_FILTERS: {
      return initProducts;
    }
    default:
      throw new Error(
        `Invalid action type. Must be one of UPDATE_FILTER, CLEAR_FILTERS. Got ${action.type}.`,
      );
  }
}

function useProductsContext(initProducts: ProductType[]) {
  const [products, productsDispatch] = useReducer(
    productsReducer,
    initProducts,
  );

  const productActions = useMemo(() => {
    return ACTIONS;
  }, []);

  return { products, productsDispatch, productActions };
}

export type ProductsContextType = ReturnType<typeof useProductsContext>;
const initProductsContext = {
  products: initProducts,
  productsDispatch: () => {},
  productActions: ACTIONS,
};

const ProductContext = createContext<ProductsContextType>(initProductsContext);

type ChildrenType = { children: ReactElement | ReactElement[] };

export function ProductsProvider({ children }: ChildrenType) {
  return (
    <ProductContext.Provider value={useProductsContext(initProducts)}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
