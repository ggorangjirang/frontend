"use client";

import { Product, getProductListBestSellingRandom, getProductListLimitedSaleRandom } from "@/apis/product";
import ProductCardListSet from "@/components/common/cards/ProductCardListSet";
import Slider from "@/components/main/Slider";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Page({}: Props) {
  const [limitedData, setLimitedData] = useState<Product[] | undefined>([]);
  const [bestSellingData, setBestSellingData] = useState<Product[] | undefined>([]);

  async function initProducts() {
    const limitedSaledata = await getProductListLimitedSaleRandom({});
    const bestSellingdata = await getProductListBestSellingRandom({});

    setLimitedData(limitedSaledata);
    setBestSellingData(bestSellingdata);
  }

  useEffect(() => {
    initProducts();
  }, [limitedData, bestSellingData]);
  return (
    <PageWrapper>
      <Slider></Slider>
      <ProductCardListSet title="선착순 한정세일" data={limitedData}></ProductCardListSet>
      <ProductCardListSet title="실시간 인기상품" data={bestSellingData}></ProductCardListSet>
      {/* <ProductCardListSet title="맞춤 추천"></ProductCardListSet> */}
    </PageWrapper>
  );
}
