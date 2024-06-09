"use client";

import { Product, getProductListBestSellingRandom, getProductListLimitedSaleRandom } from "@/apis/product";
import ProductCardListSet from "@/components/common/cards/ProductCardListSet";
import Slider from "@/components/main/Slider";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [limitedData, setLimitedData] = useState<Product[] | undefined>([]);
  const [bestSellingData, setBestSellingData] = useState<Product[] | undefined>([]);

  useEffect(() => {
    async function initProducts() {
      const limitedSaledata = await getProductListLimitedSaleRandom();
      const bestSellingdata = await getProductListBestSellingRandom();

      setLimitedData(limitedSaledata);
      setBestSellingData(bestSellingdata);
    }

    initProducts();
  }, []);
  return (
    <PageWrapper>
      <Slider></Slider>
      <ProductCardListSet title="선착순 한정세일" data={limitedData}></ProductCardListSet>
      <ProductCardListSet title="실시간 인기상품" data={bestSellingData}></ProductCardListSet>
      {/* <ProductCardListSet title="맞춤 추천"></ProductCardListSet> */}
    </PageWrapper>
  );
}
