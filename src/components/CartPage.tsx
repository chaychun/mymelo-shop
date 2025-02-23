import React from "react";
import { ArrowLeftIcon, Check, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

type PropsType = {
  setInCartView: React.Dispatch<React.SetStateAction<boolean>>;
  isOrdered: boolean;
  setIsOrdered: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartPage({ setInCartView, isOrdered, setIsOrdered }: PropsType) {
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

  const cartPage = <div></div>;

  const submitButton = (
    <motion.button
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={isOrdered ? { opacity: 0 } : {}}
      transition={{ delay: isOrdered ? 1 : 0, duration: 0.5 }}
      onClick={() => {
        setIsOrdered(true);
      }}
      className={`z-1 w-14 h-14 fixed bottom-4 right-4 text-white flex justify-center items-center rounded-lg shadow-lg cursor-pointer ${isOrdered ? "bg-emerald-400" : "bg-primary"}`}
    >
      <Check size={28} />
    </motion.button>
  );

  return (
    <div>
      {submitButton}
      {isOrdered ? orderSuccessPage : cartPage}
    </div>
  );
}

export default CartPage;
