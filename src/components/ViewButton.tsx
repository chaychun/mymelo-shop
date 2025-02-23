import { useMediaQuery } from "@uidotdev/usehooks";
import { JSXElementConstructor, ReactElement, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { ProductType } from "@/contexts/ProductsContext";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogFooter, DialogHeader, DialogDescription } from "./ui/dialog";
import { NumberField } from "react-aria-components";
import { FieldGroup } from "./ui/field";
import { NumberFieldInput, NumberFieldStepper } from "./ui/numberfield";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hooks/useCart";
import { cn } from "@/lib/utils";

type PropsType = {
  product: ProductType;
  badge: ReactElement<unknown, string | JSXElementConstructor<any>> | null;
  img: string;
};

function ViewButton({ product, badge, img }: PropsType) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [newQty, setNewQty] = useState(1);

  const { cart, cartDispatch, cartActions } = useCart();
  const currentItem = cart.find((item) => item.id === product.id);

  const [inCart, setInCart] = useState(currentItem ? true : false);

  const totalPrice = newQty * product.price;

  // When newQty === 0
  const cancelButton =
    inCart ?
      <Button
        type="submit"
        variant="destructive"
        onPress={() => {
          cartDispatch({
            type: cartActions.REMOVE,
            id: product.id,
            name: product.name,
            price: product.price,
          });
          setInCart(false);
        }}
        className="w-40 cursor-pointer"
      >
        Remove from Cart
      </Button>
    : <Button type="submit" variant="disabled" className="w-40">
        Add to Cart
      </Button>;

  // When newQty !== 0
  const submitButton =
    !inCart ?
      <Button
        type="submit"
        onPress={() => {
          cartDispatch({
            type: cartActions.CHANGE_QTY,
            id: product.id,
            name: product.name,
            price: product.price,
            qty: newQty,
          });
          setInCart(true);
        }}
        className="w-40 cursor-pointer"
      >
        Add to Cart
      </Button>
    : (
      true // newQty !== currentItem!.qty ?
    ) ?
      <Button
        type="submit"
        onPress={() => {
          cartDispatch({
            type: cartActions.CHANGE_QTY,
            id: product.id,
            name: product.name,
            price: product.price,
            qty: newQty,
          });
          setInCart(true);
        }}
        className="w-40 cursor-pointer"
      >
        Change Quantity
      </Button>
    : <Button type="submit" variant="disabled" className="w-40">
        Change Quantity
      </Button>;

  const grayPrice = newQty === 0 ? "text-neutral-400" : "";

  const priceLabel =
    newQty <= 1 ? null : (
      <span className="text-sm text-neutral-400">
        ฿{product.price} per item
      </span>
    );

  const footer = (
    <div className="flex flex-col items-start xs:flex-row justify-between gap-6">
      <div className="inline space-x-4 xs:flex xs:flex-col">
        <span className={cn("font-bold text-4xl text-rose-950", grayPrice)}>
          ฿ {totalPrice}
        </span>
        {priceLabel}
      </div>

      <div className="flex flex-row gap-2 ">
        <NumberField
          minValue={0}
          defaultValue={1}
          onChange={(qty) => setNewQty(qty)}
        >
          <FieldGroup className="flex h-10 p-0 w-[calc(100vw-15.5rem)] xs:w-40 data-[focus-within]:ring-rose-200 border-rose-100">
            <NumberFieldStepper slot="decrement" className="flex-0 p-2">
              <Minus className="size-4 text-rose-900/70" />
            </NumberFieldStepper>
            <NumberFieldInput
              value={newQty}
              className="text-center text-rose-950"
            />
            <NumberFieldStepper slot="increment" className="flex-0 p-2">
              <Plus className="size-4 text-rose-900/70" />
            </NumberFieldStepper>
          </FieldGroup>
        </NumberField>
        {newQty === 0 ? cancelButton : submitButton}
      </div>
    </div>
  );

  const dialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add to Cart</Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl bg-gradient-to-b from-pink-50 to-white">
        <DialogHeader className="space-y-4">
          <img
            src={img}
            alt={product.name}
            className="w-[80%] max-h-min mx-auto"
          />
          <DialogTitle className="text-2xl text-rose-950">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-rose-900/70">
            {product.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="block pt-4">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const drawer = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">Add to Cart</Button>
      </DrawerTrigger>
      <DrawerContent className="px-6 pb-6 bg-gradient-to-b from-pink-50 to-white">
        <DrawerHeader className="space-y-4 overflow-y-scroll scrollbar-hide">
          <img src={img} alt={product.name} className=" max-h-min mx-auto" />
          <div>
            <DrawerTitle className="text-2xl text-rose-950">
              {product.name}
            </DrawerTitle>
            {badge}
          </div>
          <DrawerDescription className="text-rose-900/70">
            {product.description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isDesktop ? dialog : drawer;
}

export default ViewButton;
