"use client";
import TextMedium from "@/components/common/labels/TextMedium";
import ProductTitleLabel from "@/components/common/labels/ProductTitleLabel";
import LabelInfo from "@/components/products/LabelInfo";
import LabelPrice from "@/components/products/LabelPrice";
import ProductInfo from "@/components/products/ProductInfo";
import Tag from "@/components/products/Tag";
import PageWrapper from "@/layout/Wrapper/PageWrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextBig from "@/components/common/labels/TextBig";
import CountSpinner from "@/components/common/input/CountSpinner/CountSpinner";
import ButtonIcon from "@/components/common/Buttons/ButtonIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/utils/time";
import { ProductDetail, Review, getProduct, getProductReview } from "@/apis/product";
import ProductReview from "@/components/products/ProductReview";
import { getCartItems, postCartItems } from "@/apis/cart/index";
import { useRecoilRefresher_UNSTABLE, useRecoilState } from "recoil";
import { cartItemSelector } from "@/recoil/selectors/cartCountState";
import { cartState } from "@/recoil/atoms/cartState";

export default function Page() {
  const [count, setCount] = useState(1);
  const [showDetail, setShowDeatil] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const productId = useSearchParams().get("productId") ?? "";
  const router = useRouter();
  const [productDetailInfo, setProductDetailInfo] = useState<ProductDetail>();
  const [productReviewsInfo, setProductReviewsInfo] = useState<Review[]>([]);

  const onClickPurchaseButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(`/buying?route=product&productId=${productId}&count=${count}`);
  };

  const onClickCartItemButton = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      //api호출로 장바구니에 상품추가

      const res = await postCartItems({ productId: Number(productId), quantity: count });
      if (true) {
        const response = await getCartItems();
        //응답이오면
        if (response.status === 200) {
          const totalElements = response.data.totalElements;
          setCart((prev) => ({ ...prev, totalCount: totalElements }));
        } else {
          throw Error("장바구니 데이터 불러오기에서 에러가 발생했습니다.");
        }
      }

      //cartReresh();
      // 응답 코드가 200이면 최신 장바구니 데이터 업데이트

      // 상품 추가 성공 메시지
      alert("카트에 상품이 추가되었습니다.");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("문제가 발생했습니다. 다시 시도해주세요");
    }
  };

  //리뷰 받아오기
  useEffect(() => {
    async function initProduct() {
      const Productdata = await getProduct(productId);
      const productReviewsData = await getProductReview(productId);
      setProductDetailInfo(Productdata);
      setProductReviewsInfo(productReviewsData);
    }

    initProduct();
  }, [productId]);

  if (!productDetailInfo || !productReviewsInfo) return <></>;

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
                <TextMedium>{`${productDetailInfo?.categoryName} > ${productDetailInfo?.subcategoryName}`}</TextMedium>
                <TextBig bold={true}>{productDetailInfo?.name}</TextBig>
              </div>
              <TextMedium>
                {productReviewsInfo.length > 0 ? `${productReviewsInfo.length}개의 상품후기` : ""}
              </TextMedium>
            </div>
            <div className="mb-6 mt-4 flex flex-col gap-8 border-y border-gray px-8 py-10">
              <ProductInfo>
                <LabelInfo text={"판매가"} />
                <TextMedium gray={true} style={{ textDecoration: "line-through" }}>
                  {`${productDetailInfo?.price.toLocaleString()} 원`}
                </TextMedium>
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
                <TextMedium>수량</TextMedium>
                <div className="flex flex-col items-center gap-3">
                  {/* //todo productId수정 */}
                  <CountSpinner productId={100} count={count} setCount={setCount} maximum={productDetailInfo.stock} />
                  <div className="text-base font-bold text-primary">{`재고 ${productDetailInfo?.stock}개 남음`}</div>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <TextMedium gray={true}>총 상품금액</TextMedium>
                <TextBig bold={true}>{`${(count * productDetailInfo?.discountedPrice).toLocaleString()}`}원</TextBig>
              </div>
            </div>
            <div className="mb-32 mt-16 flex flex-row justify-between align-middle">
              <ButtonIcon
                bgColor="bg-primary"
                name="Cart"
                color="white"
                size={28}
                onClickHandler={onClickCartItemButton}
              >
                장바구니 담기
              </ButtonIcon>
              <ButtonIcon
                bgColor="bg-secondary"
                name="ArrowRight"
                color="white"
                size={28}
                onClickHandler={onClickPurchaseButton}
              >
                바로 구매
              </ButtonIcon>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-14 " id="description">
          {/* 상품상세 블록 */}
          <div className="mb-10 flex h-12 w-full flex-row">
            <div className="color flex w-1/2 border-collapse items-center justify-center border-l border-t border-gray">
              <a href="#description">
                <TextMedium color={true} style={{ fontWeight: "bold" }}>
                  상품정보
                </TextMedium>
              </a>
            </div>
            <div className="flex w-1/2 border-collapse items-center justify-center border  border-gray ">
              <a href="#review">
                <TextMedium>상품후기</TextMedium>
              </a>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center px-4">
            <Image src={"/imgs/logos/logo2.png"} width={250} height={100} alt={"로고"} />
            <div className="mt-4 w-full border-t pt-4">
              <TextMedium style={{ fontWeight: "bold" }}>상품설명!</TextMedium>
              <div id={"description"} className="">
                {productDetailInfo?.description}
              </div>
            </div>
            <button
              onClick={() => {
                setShowDeatil(!showDetail);
              }}
            >
              더보기
            </button>
            <div className={`flex h-1/4 w-full justify-center py-8 ${showDetail ? "" : "overflow-hidden"}`}>
              <Image
                width={0}
                height={0}
                quality={100}
                sizes="100"
                src={productDetailInfo?.descriptionImageUrl!}
                alt={"상품설명 이미지"}
                style={{
                  objectFit: "cover",
                  width: "80%",
                  height: showDetail ? "300px" : "auto",
                }} // optional
              />
            </div>
          </div>
        </div>

        <div className="items-align mt-24 flex flex-col justify-center">
          {/* 상품후기 블록 */}
          <div className="mb-10 flex h-12 w-full flex-row" id="review">
            <div className="color flex w-1/2 items-center justify-center border border-gray ">
              <a href="#description">
                <TextMedium>상품정보</TextMedium>
              </a>
            </div>
            <div className="flex w-1/2 items-center justify-center border-r border-t border-gray">
              <a href="#review">
                <TextMedium color={true} style={{ fontWeight: "bold" }}>
                  상품후기
                </TextMedium>
              </a>
            </div>
          </div>
          <div className="items-align flex flex-col justify-center  gap-6 ">
            {/* 후기블록 table로 구현하면 더 좋을듯*/}
            {productReviewsInfo.map((review) => {
              return <ProductReview key={review.reviewId} review={review}></ProductReview>;
            })}
          </div>
        </div>
      </PageWrapper>
    )
  );
}
