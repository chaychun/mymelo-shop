import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/contexts/ProductsContext";
import { Badge } from "./ui/badge";
import { ReactElement } from "react";
import ViewButton from "./ViewButton";

type PropsType = {
  product: ProductType;
};

function ProductCard({ product }: PropsType) {
  const img: string = new URL(
    `../assets/images/${product.id}.png`,
    import.meta.url,
  ).href;

  function getCategoryBadge(product: ProductType): ReactElement | null {
    switch (product.category) {
      case "PLUSH":
        return <Badge variant="pink">Plush</Badge>;
      case "FIGURE":
        return <Badge variant="fuchsia">Figure</Badge>;
      case "OTHERS":
        return <Badge variant="rose">Others</Badge>;
      default:
        return null;
    }
  }

  const badge = getCategoryBadge(product);

  return (
    <Card className="bg-neutral-50 flex-grow max-w-88 min-w-88 shadow-lg">
      <CardHeader className="flex relative justify-between">
        <div>
          <img
            src={img}
            alt={product.name}
            className="absolute max-w-48 max-h-48 -top-20 left-42"
          />
        </div>
        <div className="min-h-[3em]">
          <CardTitle className="text-xl w-42">{product.name}</CardTitle>
        </div>
        {getCategoryBadge(product)}
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="font-bold text-3xl">฿{product.price}</span>
        <ViewButton product={product} badge={badge} img={img} />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
