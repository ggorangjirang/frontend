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
  }, [productId]);

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
        <div className="flex flex-col items-center gap-14" id="description">
          {/* 상품상세 블록 */}
          <div className="flex h-12 w-full flex-row">
            <div className="color flex w-1/2 border-collapse items-center justify-center border-l border-t ">
              <a href="#description">
                <TextMedium text="상품정보" color={true} style={{ fontWeight: "bold" }} />
              </a>
            </div>
            <div className="flex w-1/2 border-collapse items-center justify-center border ">
              <a href="#review">
                <TextMedium text="상품후기" />
              </a>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center px-4">
            <Image src={"/logo2.png"} width={250} height={100} alt={"로고"} />
            <div className="mt-4 w-full border-t pt-4">
              <TextMedium text="상품설명" style={{ fontWeight: "bold" }} />
              <div id={"description"} className="">
                {productDetailInfo?.description}
              </div>
            </div>
            <div
              className={"flex items-center justify-center py-8"}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                src={productDetailInfo?.descriptionImageUrl!}
                width={0}
                height={0}
                loading="lazy"
                alt={"상품설명 이미지"}
                objectFit="cover"
                style={{ width: "auto", height: "100%" }} // optional
              />
            </div>
          </div>
        </div>

        <div className="items-align flex flex-col justify-center">
          {/* 상품후기 블록 */}
          <div className="flex h-12 w-full flex-row" id="review">
            <div className="color flex w-1/2 border-collapse items-center justify-center border-l border-t ">
              <a href="#description">
                <TextMedium text="상품정보" color={true} style={{ fontWeight: "bold" }} />
              </a>
            </div>
            <div className="flex w-1/2 border-collapse items-center justify-center border ">
              <a href="#review">
                <TextMedium text="상품후기" />
              </a>
            </div>
          </div>
          <div className="items-align flex flex-col justify-center ">
            {/* 후기블록 */}
            <div className="my-12 grid  h-[180px] w-full grid-cols-[1fr_2fr_1fr] justify-center border">
              <div className="flex  h-full flex-row  justify-around bg-primary ">
                <Image src="/logo2.png" width={75} height={75} alt="img" className="rounded" />
                <div className="flex flex-col items-start">
                  <div>날짜</div>
                  <div>아이디</div>
                </div>
              </div>
              <div className="bg-secondary">후기작성칸</div>
              <div className="bg-gray">사진</div>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  );
}
