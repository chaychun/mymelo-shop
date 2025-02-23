import React from "react";
import { ArrowLeftIcon, Check, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";
import useProducts from "@/hooks/useProducts";
import EmptyState from "./EmptyState";

type PropsType = {
  setInCartView: React.Dispatch<React.SetStateAction<boolean>>;
  isOrdered: boolean;
  setIsOrdered: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartPage({ setInCartView, isOrdered, setIsOrdered }: PropsType) {
  const { cart, cartDispatch, cartActions, totalPrice } = useCart();
  const { productsDispatch, productActions } = useProducts();

  const isEmpty = cart.length === 0;

  const orderSuccessPage = (
    <div className="min-h-screen flex flex-col justify-center items-center my-auto">
      <PackageCheck
        size={60}
        strokeWidth={3}
        absoluteStrokeWidth
        className="text-rose-950"
      />
      <h1 className="text-3xl text-center font-semibold mt-4 mb-40 text-rose-950">
        Thank You for Ordering!
      </h1>
      <Button
        className="group"
        variant="link"
        onPress={() => {
          setIsOrdered(false);
          setInCartView(false);
        }}
      >
        <div className="flex gap-2 items-center">
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5 text-rose-900/70"
            size={16}
            aria-hidden="true"
          />
          <span className="text-rose-950">Back to Home</span>
        </div>
      </Button>
    </div>
  );

  const cartList = cart.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const cartPage = (
    <div className="p-4 max-w-lg mx-auto flex flex-col gap-4">{cartList}</div>
  );

  const submitButton = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={isOrdered ? { opacity: 0 } : {}}
      transition={{ delay: isOrdered ? 1 : 0, duration: 0.5 }}
      onClick={() => {
        if (!isEmpty) {
          setIsOrdered(true);
          cartDispatch({
            type: cartActions.CLEAR,
            id: "",
            name: "",
            price: 0,
          });
          productsDispatch({
            type: productActions.CLEAR_FILTERS,
            filter: "",
          });
        }
      }}
      className={`z-1 w-14 h-14 fixed bottom-4 right-4 bg-rose-400 text-white flex justify-center items-center rounded-lg shadow-lg ${
        isOrdered ? "!bg-emerald-400 inert"
        : isEmpty ? "!bg-rose-300 inert"
        : "bg-primary cursor-pointer"
      }`}
    >
      <Check size={28} />
    </motion.button>
  );

  const priceBar = (
    <div className="z-1 fixed bottom-4 left-20 h-14 w-[calc(100vw-10em)] px-2 pt-3.5 bg-neutral-100 rounded-lg shadow-lg border-1 bg-gradient-to-b from-pink-100 to-white shadow-pink-300/30">
      <span className="font-semibold text-3xl mx-auto text-rose-950">
        ฿ {totalPrice}
      </span>
      <span className="absolute text-rose-900/70 text-xs font-light left-1.5 top-0.5">
        Total Price
      </span>
    </div>
  );

  return (
    <div>
      {submitButton}
      {isOrdered ? null : priceBar}
      {isOrdered ?
        orderSuccessPage
      : isEmpty ?
        <EmptyState where="the cart" />
      : cartPage}
    </div>
  );
}

export default CartPage;
