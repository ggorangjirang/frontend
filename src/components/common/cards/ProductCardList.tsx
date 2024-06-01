import ProductCard from "./ProductCard";
import { Product } from "@/apis/product/product";

export interface ProductCardProps {
  cardInfo: Product;
  imgSize?: number;
  gapX?: number;
  w?: number;
}

export default function ProductCardList({ imgSize = 250, gapX = 56, w = 1240 }: ProductCardProps) {
  return (
    <div className={`flex flex-wrap justify-center align-middle`} style={{ width: w, gap: gapX }}>
      {/* <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard> */}
    </div>
  );
}
