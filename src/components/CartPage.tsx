import React from "react";
import { ArrowLeftIcon, Check, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";

type PropsType = {
  setInCartView: React.Dispatch<React.SetStateAction<boolean>>;
  isOrdered: boolean;
  setIsOrdered: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartPage({ setInCartView, isOrdered, setIsOrdered }: PropsType) {
  const { cart, cartDispatch, cartActions, totalPrice } = useCart();

  const orderSuccessPage = (
    <div className="min-h-screen flex flex-col justify-center items-center my-auto">
      <PackageCheck size={60} strokeWidth={3} absoluteStrokeWidth />
      <h1 className="text-3xl text-center font-semibold mt-4 mb-40">
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
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          <span>Back to Home</span>
        </div>
      </Button>
    </div>
  );

  const cartList = cart.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const cartPage = <div className="p-4">{cartList}</div>;

  const submitButton = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={isOrdered ? { opacity: 0 } : {}}
      transition={{ delay: isOrdered ? 1 : 0, duration: 0.5 }}
      onClick={() => {
        setIsOrdered(true);
        cartDispatch({
          type: cartActions.CLEAR,
          id: "",
          name: "",
          price: 0,
        });
      }}
      className={`z-1 w-14 h-14 fixed bottom-4 right-4 text-white flex justify-center items-center rounded-lg shadow-lg cursor-pointer ${isOrdered ? "bg-emerald-400" : "bg-primary"}`}
    >
      <Check size={28} />
    </motion.button>
  );

  const priceBar = (
    <div className="z-1 fixed bottom-4 left-20 h-14 w-[calc(100vw-10em)] px-2 pt-3.5 bg-neutral-100 rounded-lg shadow-lg border-1">
      <span className="font-semibold text-3xl mx-auto">฿ {totalPrice}</span>
      <span className="absolute text-neutral-400 text-xs font-light left-1.5 top-0.5">
        Total Price
      </span>
    </div>
  );

  return (
    <div>
      {submitButton}
      {isOrdered ? null : priceBar}
      {isOrdered ? orderSuccessPage : cartPage}
    </div>
  );
}

export default CartPage;
