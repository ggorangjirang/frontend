
import ProductCardList from "@/components/common/cards/ProductCardList";
import Slider from "@/components/main/Slider";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <>
    <Slider></Slider>
    <ProductCardList></ProductCardList>
    </>
  );
}
