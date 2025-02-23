import React from "react";
import { ArrowLeftIcon, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";

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

  const cartPage = (
    <div>
      <Button // submit order
        onPress={() => {
          setIsOrdered(true);
        }}
      >
        Order Now!
      </Button>
    </div>
  );

  if (isOrdered) {
    return orderSuccessPage;
  } else {
    return cartPage;
  }
}

export default CartPage;
