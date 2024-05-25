import ProductCardList from "@/components/common/cards/ProductCardList";
import Slider from "@/components/main/Slider";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <PageWrapper>
      <Slider></Slider>
      <ProductCardList title="선착순 한정세일"></ProductCardList>
      <ProductCardList title="실시간 인기상품"></ProductCardList>
      <ProductCardList title="맞춤 추천"></ProductCardList>
    </PageWrapper>
  );
}
