"use client";
import TextMedium from "@/components/common/labels/TextMedium";
import ProductTitleLabel from "@/components/common/labels/ProductTitleLabel";
import LabelInfo from "@/components/products/LabelInfo";
import LabelPrice from "@/components/products/LabelPrice";
import ProductInfo from "@/components/products/ProductInfo";
import Tag from "@/components/products/Tag";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Image from "next/image";
import React, { useState } from "react";
import TextBig from "@/components/common/labels/TextBig";
import CountSpinner from "@/components/common/input/CountSpinner/CountSpinner";
import ButtonIcon from "@/components/common/Buttons/ButtonIcon";

const DUMMY = {
  imgUrl: "/testImg.png",
  title: "굿모닝 탱구 귀여움 치사량 주의하세요 너무 귀여워서 ",
  discount: "10%",
  originPrice: 300000,
  price: 200000, //db에서 최종 price 계산해서 주는지?
  option: "품절",
};

type Props = {};

export default function page({}: Props) {
  const [count, setCount] = useState<number>(1);

  return (
    <PageWrapper flexColumn={true}>
      <ProductTitleLabel>사료</ProductTitleLabel>
      <div className="flex flex-row justify-between gap-16">
        <div>
          <Image src={DUMMY.imgUrl} alt="product_img" width={478} height={478} />
        </div>
        <div className="w-[700px]">
          <div className="flex flex-col gap-1">
            <div>
              <TextMedium text="사료" />
              <TextBig bold={true}>뉴트로지나 말티즈 전용 건강백서</TextBig>
            </div>
            <TextMedium text="1억개의 상품 후기" />
          </div>
          <div className="mb-6 mt-4 flex flex-col gap-8 border-y border-gray px-8 py-10">
            <ProductInfo>
              <LabelInfo text={"종류"} />
              <TextMedium text="말티즈" gray={true} />
            </ProductInfo>
            <ProductInfo>
              <LabelInfo text={"판매가"} />
              <TextMedium text="48,000원" gray={true} style={{ textDecoration: "line-through" }} />
            </ProductInfo>
            <ProductInfo>
              <LabelInfo text={"할인가"} />
              <LabelPrice>{"39,900원"}</LabelPrice>
            </ProductInfo>
            <ProductInfo>
              <LabelInfo text={"할인가"} />
              <Tag>20005년 9월 29일 이후</Tag>
            </ProductInfo>
          </div>
          <div className="flex items-center justify-between bg-[#F4F4F4] px-9 py-8">
            <div className="flex flex-col gap-6">
              <TextMedium text="수량"></TextMedium>
              <div className="flex flex-col items-center gap-3">
                <CountSpinner count={count} setCount={setCount} />
                <div className="text-base font-bold text-primary">(재고 1개 남음)</div>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <TextMedium text="총 상품금액" gray={true} />
              <TextBig bold={true}>51,000 원</TextBig>
            </div>
          </div>
          <div className="flex flex-row justify-between align-middle mt-16 mb-32">
            <ButtonIcon bgColor="bg-primary" name="Basket" color="white" size={28}>장바구니 담기</ButtonIcon>
            <ButtonIcon bgColor="bg-secondary" name="ArrowRight" color="white" size={28}>바로 구매</ButtonIcon>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
