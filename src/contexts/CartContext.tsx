import { useMemo, useReducer, createContext, ReactElement } from "react";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

const ACTIONS = {
  CHANGE_QTY: "CHANGE_QTY",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
  SORT: "SORT",
};

export type CartActionType = {
  type: string;
  id: string;
  name: string;
  price: number;
  qty?: number;
};

function cartReducer(
  cart: CartItemType[],
  action: CartActionType,
): CartItemType[] {
  switch (action.type) {
    case ACTIONS.CHANGE_QTY: {
      const { id, name, price, qty } = action;
      const filteredCart = cart.filter((item) => item.id !== id);
      if (qty) {
        return [...filteredCart, { id, name, price, qty }];
      } else {
        throw new Error("Requested CHANGE_QTY without providing quantity.");
      }
    }
    case ACTIONS.REMOVE: {
      return cart.filter((item) => item.id !== action.id);
    }
    case ACTIONS.CLEAR: {
      return [];
    }
    default:
      throw new Error(
        `Invalid cart action type. Must be one of ADD, CHANGE_QTY, REMOVE. Got ${action.type}`,
      );
  }
}

const initCart: CartItemType[] = [];

function useCartContext(initCart: CartItemType[]) {
  const [_cart, cartDispatch] = useReducer(cartReducer, initCart);

  const cartActions = useMemo(() => {
    return ACTIONS;
  }, []);

  const totalPrice = _cart.reduce((prevValue, item) => {
    return prevValue + item.qty * item.price;
  }, 0);

  const cart = _cart.sort((a, b) => Number(a.id) - Number(b.id));

  return { cart, cartDispatch, cartActions, totalPrice };
}

export type CartContextType = ReturnType<typeof useCartContext>;
const initCartContext = {
  cart: [],
  cartDispatch: () => {},
  cartActions: ACTIONS,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>(initCartContext);

type ChildrenType = { children: ReactElement | ReactElement[] };
export function CartProvider({ children }: ChildrenType) {
  return (
    <CartContext.Provider value={useCartContext(initCart)}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
