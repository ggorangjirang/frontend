import React from "react";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
}

export default function ProductCardList({ title }: Props) {
  return (
    <div className="border-b border-gray-border last:border-b-0 ">
      <div className=" w-full flex flex-row items-start justify-start text-[22px] font-bold text-text my-9">
        <div>{title}</div>
      </div>
      <div className="flex w-[1240px] my-2 flex-wrap justify-center gap-14 gap-x-20 b align-middle ">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <div className="mb-12 flex h-12 w-60 cursor-pointer items-center justify-center rounded-full border border-gray-border text-gray hover:opacity-55">
          상품 전체보기{" "}
        </div>
      </div>
    </div>
  );
}
