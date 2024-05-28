"use client";

import ProductCardListSet from "@/components/common/cards/ProductCardListSet";
import Slider from "@/components/main/Slider";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import React, { useState } from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <PageWrapper>
      <Slider></Slider>
      <ProductCardListSet title="선착순 한정세일"></ProductCardListSet>
      <ProductCardListSet title="실시간 인기상품"></ProductCardListSet>
      <ProductCardListSet title="맞춤 추천"></ProductCardListSet>
    </PageWrapper>
  );
}
