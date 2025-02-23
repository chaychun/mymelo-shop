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
  description: string;
  category: string;
  price: number;
};

const initProducts: ProductType[] = [
  {
    id: "001",
    name: "Pink Jumper My Melody Figure",
    description:
      "A charming My Melody figure dressed in a cozy pink jumper, capturing the sweet and snug essence of a perfect lazy day. Soft hues and delicate details make it a delightful collectible for any fan.",
    category: "FIGURE",
    price: 500,
  },
  {
    id: "002",
    name: "My Melody Strawberry Cake",
    description:
      "A delightfully soft My Melody plush, sweet as a strawberry cake! Dressed in pastel hues with adorable dessert-inspired details, she's a treat to cuddle and display.",
    category: "PLUSH",
    price: 1200,
  },
  {
    id: "003",
    name: "Baby My Melody Makeup Bag",
    description:
      "A darling makeup bag featuring Baby My Melody, perfect for storing your beauty essentials with a touch of sweetness. Soft colors and a compact design make it as charming as it is practical.",
    category: "OTHERS",
    price: 400,
  },
  {
    id: "004",
    name: "Rose Fairy My Melody",
    description:
      "A dreamy My Melody plush dressed as a delicate rose fairy, with soft petals and enchanting details. She’s the perfect companion to add a touch of magic and floral charm to your collection.",
    category: "PLUSH",
    price: 1000,
  },
  {
    id: "005",
    name: "Violet Fairy My Melody",
    description:
      "A whimsical My Melody plush dressed as a violet fairy, wrapped in soft lavender hues with enchanting fairy-tale details. She brings a touch of magic and sweetness wherever she goes!",
    category: "PLUSH",
    price: 1000,
  },
  {
    id: "006",
    name: "Pink Macaron My Melody",
    description:
      "A delightful My Melody figure inspired by a pink macaron, blending sweet pastel tones with an irresistibly charming design. As cute as a confection, she’s a perfect treat for any collector!",
    category: "FIGURE",
    price: 650,
  },
  {
    id: "007",
    name: "White Cat Princess My Melody",
    description:
      "A regal My Melody plush dressed as a White Cat Princess, adorned with soft fur, delicate details, and a touch of elegance. She’s the purr-fect blend of charm and royalty!",
    category: "PLUSH",
    price: 1400,
  },
  {
    id: "008",
    name: "Sleepy Witch My Melody",
    description:
      "A whimsical Sleepy Witch My Melody figure, with a cozy hat and dreamy expression, capturing the magic of a restful slumber. This enchanting piece blends the charm of My Melody with a sprinkle of spooky sweetness!",
    category: "FIGURE",
    price: 650,
  },
  {
    id: "009",
    name: "Little White Bear My Melody",
    description:
      "An adorable My Melody plush cuddled up as a little white bear, with soft, plush fur and a heartwarming charm. She’s the perfect companion for those who love sweet, bear-like cuddles with a My Melody twist!",
    category: "PLUSH",
    price: 580,
  },
  {
    id: "010",
    name: "Red My Melody Phone Case",
    description:
      "A vibrant red My Melody phone case that adds a pop of color and sweetness to your device. With its playful design and protective fit, it’s the perfect way to showcase your love for My Melody wherever you go!",
    category: "OTHERS",
    price: 400,
  },
  {
    id: "011",
    name: "Valentine Angel My Melody",
    description:
      "A heavenly Valentine Angel My Melody figure, featuring soft wings and a heartwarming expression, perfect for spreading love and sweetness. This charming piece is a delightful way to celebrate the season of love with a touch of angelic grace.",
    category: "FIGURE",
    price: 890,
  },
  {
    id: "012",
    name: "Blue Snow My Melody",
    description:
      "A serene Blue Snow My Melody figure, capturing the beauty of winter with frosty hues and delicate snowflake details. This peaceful piece brings a touch of winter magic and charm to any collection.",
    category: "FIGURE",
    price: 650,
  },
  {
    id: "013",
    name: "Dream Princess My Melody",
    description:
      "A regal Dream Princess My Melody figure, dressed in a flowing gown and adorned with dreamy details. She’s the perfect blend of elegance and sweetness, bringing a fairytale touch to your collection.",
    category: "FIGURE",
    price: 650,
  },
  {
    id: "014",
    name: "White Cat My Melody Keychain",
    description:
      "A cute White Cat My Melody keychain, featuring My Melody dressed as an adorable white cat with fluffy ears and a playful expression. A charming accessory to keep your keys—or your day—extra sweet and whimsical!",
    category: "OTHERS",
    price: 440,
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
