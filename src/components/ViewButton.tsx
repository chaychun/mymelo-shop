import { useMediaQuery } from "@uidotdev/usehooks";
import { JSXElementConstructor, ReactElement, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { ProductType } from "@/contexts/ProductsContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogFooter, DialogHeader, DialogDescription } from "./ui/dialog";
import { NumberField } from "react-aria-components";
import { FieldGroup } from "./ui/field";
import { NumberFieldInput, NumberFieldStepper } from "./ui/numberfield";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hooks/useCart";

type PropsType = {
  product: ProductType;
  badge: ReactElement<unknown, string | JSXElementConstructor<any>> | null;
  img: string;
};

function ViewButton({ product, badge, img }: PropsType) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [newQty, setNewQty] = useState(2);

  const { cart, cartDispatch, cartActions } = useCart();
  const currentItem = cart.find((item) => item.id === product.id);

  const totalPrice = newQty * product.price;

  const footer = (
    <div className="flex flex-col items-start xs:flex-row justify-between gap-6">
      <span className="font-bold text-4xl">฿ {totalPrice}</span>
      <div className="flex flex-row gap-2">
        <NumberField
          minValue={0}
          defaultValue={1}
          onChange={(qty) => setNewQty(qty)}
        >
          <FieldGroup className="flex h-10 p-0 w-[calc(100vw-108px-5.5rem)] xs:w-40">
            <NumberFieldStepper slot="decrement" className="flex-0 p-2">
              <Minus className="size-4" />
            </NumberFieldStepper>
            <NumberFieldInput value={newQty} className="text-center" />
            <NumberFieldStepper slot="increment" className="flex-0 p-2">
              <Plus className="size-4" />
            </NumberFieldStepper>
          </FieldGroup>
        </NumberField>
        <Button className="">Add to Cart</Button>
      </div>
    </div>
  );

  const dialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">View More</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <img
            src={img}
            alt={product.name}
            className="w-[80%] max-h-min mx-auto"
          />
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            Elit officia irure ullamco commodo eiusmod tempor ad ullamco culpa
            et deserunt. Occaecat reprehenderit sit do nulla adipisicing
            cupidatat labore mollit eiusmod. Pariatur amet mollit ea nisi
            nostrud laborum deserunt exercitation enim eu Lorem.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="block pt-4">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const drawer = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">View More</Button>
      </DrawerTrigger>
      <DrawerContent className="px-6 pb-6">
        <DrawerHeader className="space-y-4">
          <img src={img} alt={product.name} className=" max-h-min mx-auto" />
          <div>
            <DrawerTitle className="text-2xl">{product.name}</DrawerTitle>
            {badge}
          </div>
          <DrawerDescription>
            Elit officia irure ullamco commodo eiusmod tempor ad ullamco culpa
            et deserunt. Occaecat reprehenderit sit do nulla adipisicing
            cupidatat labore mollit eiusmod. Pariatur amet mollit ea nisi
            nostrud laborum deserunt exercitation enim eu Lorem.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isDesktop ? dialog : drawer;
}

export default ViewButton;
