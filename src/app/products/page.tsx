"use client";
import TextMedium from "@/components/common/labels/TextMedium";
import ProductTitleLabel from "@/components/common/labels/ProductTitleLabel";
import LabelInfo from "@/components/products/LabelInfo";
import LabelPrice from "@/components/products/LabelPrice";
import ProductInfo from "@/components/products/ProductInfo";
import Tag from "@/components/products/Tag";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TextBig from "@/components/common/labels/TextBig";
import CountSpinner from "@/components/common/input/CountSpinner/CountSpinner";
import ButtonIcon from "@/components/common/Buttons/ButtonIcon";
import { useSearchParams } from "next/navigation";
import { PropductDetail, getProduct } from "@/apis/product";
import { formatDate } from "@/utils/time";

type Props = {};

export default function Page({}: Props) {
  const [count, setCount] = useState(1);
  const productId = useSearchParams().get("productId") ?? "";
  const [productDetailInfo, setProductDetailInfo] = useState<PropductDetail>();

  //리뷰 받아오기
  useEffect(() => {
    async function initProduct() {
      const data = await getProduct(productId);
      setProductDetailInfo(data);
    }

    initProduct();
  }, [productDetailInfo, productId]);

  return (
    productDetailInfo && (
      <PageWrapper flexColumn={true}>
        <ProductTitleLabel>{productDetailInfo?.subcategoryName}</ProductTitleLabel>
        <div className="flex flex-row justify-between gap-16">
          <div>
            <Image
              src={
                productDetailInfo?.productImageUrl === "url"
                  ? "/testImg.png"
                  : (productDetailInfo?.productImageUrl as string)
              }
              alt="product_img"
              width={478}
              height={478}
            />
            {/*TODO 추후 수정*/}
          </div>
          <div className="w-[700px]">
            <div className="flex flex-col gap-1">
              <div>
                <TextMedium text={`${productDetailInfo?.categoryName} > ${productDetailInfo?.subcategoryName}`} />
                <TextBig bold={true}>{productDetailInfo?.name}</TextBig>
              </div>
              <TextMedium text="1억개의 상품 후기" />
            </div>
            <div className="mb-6 mt-4 flex flex-col gap-8 border-y border-gray px-8 py-10">
              <ProductInfo>
                <LabelInfo text={"판매가"} />
                <TextMedium
                  text={`${productDetailInfo?.price.toLocaleString()} 원`}
                  gray={true}
                  style={{ textDecoration: "line-through" }}
                />
              </ProductInfo>
              <ProductInfo>
                <LabelInfo text={"할인가"} />
                <LabelPrice>{`${productDetailInfo?.discountedPrice.toLocaleString()} 원`}</LabelPrice>
              </ProductInfo>
              {productDetailInfo?.expirationDate && (
                <ProductInfo>
                  <LabelInfo text={"유통기한"} />
                  <Tag>{`${formatDate(productDetailInfo?.expirationDate)}`} 이후</Tag>
                </ProductInfo>
              )}
            </div>
            <div className="flex items-center justify-between bg-[#F4F4F4] px-9 py-8">
              <div className="flex flex-col gap-6">
                <TextMedium text="수량"></TextMedium>
                <div className="flex flex-col items-center gap-3">
                  <CountSpinner count={count} setCount={setCount} maximum={productDetailInfo.stock} />
                  <div className="text-base font-bold text-primary">{`재고 ${productDetailInfo?.stock}개 남음`}</div>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <TextMedium text="총 상품금액" gray={true} />
                <TextBig bold={true}>{`${(count * productDetailInfo?.discountedPrice).toLocaleString()}`}원</TextBig>
              </div>
            </div>
            <div className="mb-32 mt-16 flex flex-row justify-between align-middle">
              <ButtonIcon bgColor="bg-primary" name="Basket" color="white" size={28}>
                장바구니 담기
              </ButtonIcon>
              <ButtonIcon bgColor="bg-secondary" name="ArrowRight" color="white" size={28}>
                바로 구매
              </ButtonIcon>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  );
}
