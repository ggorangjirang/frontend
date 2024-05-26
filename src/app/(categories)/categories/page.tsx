import ProductCardList from "@/components/common/cards/ProductCardList";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return <ProductCardList imgSize={200} gapX={56} w={1000}></ProductCardList>;
}
