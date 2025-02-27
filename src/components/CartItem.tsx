import { CartItemType } from "@/contexts/CartContext";
import React from "react";
import {
  NumberField,
  NumberFieldInput,
  NumberFieldStepper,
} from "./ui/numberfield";
import { FieldGroup } from "./ui/field";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/useCart";

type PropsType = {
  item: CartItemType;
};

function CartItem({ item }: PropsType) {
  const { cartDispatch, cartActions } = useCart();

  const [initQty] = React.useState(item.qty);

  const img: string = new URL(
    `../assets/images/${item.id}.png`,
    import.meta.url,
  ).href;

  return (
    <div className="flex p-4 gap-4 border-1 rounded-lg bg-gradient-to-b from-pink-100 to-white justify-between">
      <img src={img} alt={item.name} className="max-w-[20%]" />
      <div className="flex flex-col justify-center gap-2">
        <div className="flex justify-between">
          <h2 className="font-medium text-sm max-w-[50%] text-rose-950">
            {item.name}
          </h2>
          <span className="font-bold text-lg text-rose-950">
            ฿{item.price * item.qty}
          </span>
        </div>
        <div className="flex justify-between">
          <NumberField
            minValue={1}
            defaultValue={initQty}
            onChange={(newQty) => {
              cartDispatch({
                type: cartActions.CHANGE_QTY,
                id: item.id,
                name: item.name,
                price: item.price,
                qty: newQty,
              });
            }}
          >
            <FieldGroup className="flex h-6 p-0 w-1/2 xs:w-40 data-[focus-within]:ring-rose-200 border-rose-100">
              <NumberFieldStepper slot="decrement" className="flex-0 p-2">
                <Minus className="size-3 text-rose-900/70" />
              </NumberFieldStepper>
              <NumberFieldInput
                value={item.qty}
                className="text-center text-xs text-rose-950"
              />
              <NumberFieldStepper slot="increment" className="flex-0 p-2">
                <Plus className="size-3 text-rose-900/70" />
              </NumberFieldStepper>
            </FieldGroup>
          </NumberField>

          <Button
            variant="outline"
            size="icon"
            onPress={() => {
              cartDispatch({
                type: cartActions.REMOVE,
                id: item.id,
                name: item.name,
                price: item.price,
              });
            }}
            className="h-6 w-6 text-rose-900/70 border-rose-100"
          >
            <X size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
