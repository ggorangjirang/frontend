import { Product } from "@/apis/product";
import ProductCard from "./ProductCard";

export interface ProductCardProps {
  cardInfo: Product;
  imgSize?: number;
  gapX?: number;
  w?: number;
}

export interface ProductCardListProps {
  productList: Product[];
  imgSize?: number;
  gapX?: number;
  w?: number;
}

export default function ProductCardList({ productList, imgSize = 250, gapX = 56, w = 1240 }: ProductCardListProps) {
  return (
    <div className={`flex flex-wrap justify-start align-middle`} style={{ width: w, gap: gapX }}>
      {productList.map((cardInfo) => {
        return <ProductCard key={cardInfo.productId} cardInfo={cardInfo} gapX={gapX} imgSize={imgSize}></ProductCard>;
      })}
    </div>
  );
}
