import React from "react";
import ProductCard from "./ProductCard";

export interface ProductCardProps {
  imgSize?: number;
  gapX?: number;
  w?:number;
}

export default function ProductCardList({ imgSize = 250, gapX = 14, w = 1240}: ProductCardProps) {
  return (
    <div className={`flex w-[${w}px] flex-wrap justify-center gap-${gapX} align-middle`}>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
      <ProductCard imgSize={imgSize}></ProductCard>
    </div>
  );
}
