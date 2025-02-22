import { useMemo, useReducer, createContext, ReactElement } from "react";

type CartItemType = {
  id: string;
  price: number;
  qty: number;
};

const ACTIONS = {
  ADD: "ADD",
  CHANGE_QTY: "CHANGE_QTY",
  REMOVE: "REMOVE",
};

type ActionType = {
  type: string;
  id: string;
  price: number;
  qty?: number;
};

function cartReducer(cart: CartItemType[], action: ActionType): CartItemType[] {
  switch (action.type) {
    case ACTIONS.ADD: {
      const { id, price, qty } = action;
      const filteredCart = cart.filter((item) => item.id !== id);
      if (qty) {
        return [...filteredCart, { id, price, qty }];
      } else {
        throw new Error("Requested ADD without providing quantity.");
      }
    }
    case ACTIONS.CHANGE_QTY: {
      const { id, price, qty } = action;
      const filteredCart = cart.filter((item) => item.id !== id);
      if (qty) {
        return [...filteredCart, { id, price, qty }];
      } else {
        throw new Error("Requested CHANGE_QTY without providing quantity.");
      }
    }
    case ACTIONS.REMOVE: {
      return cart.filter((item) => item.id !== action.id);
    }
    default:
      throw new Error(
        `Invalid cart action type. Must be one of ADD, CHANGE_QTY, REMOVE. Got ${action.type}`,
      );
  }
}

const initCart: CartItemType[] = [];

function useCartContext(initCart: CartItemType[]) {
  const [cart, cartDispatch] = useReducer(cartReducer, initCart);

  const cartActions = useMemo(() => {
    return ACTIONS;
  }, []);

  const totalPrice = cart.reduce((prevValue, item) => {
    return prevValue + item.qty * item.price;
  }, 0);

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
