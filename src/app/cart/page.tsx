"use client";

import { useEffect, useState } from "react";
import Pagination from "@/layout/Pagenation/Pagination";
import { PageInfo } from "@/layout/Pagenation/Pagination";
import { ButtonMedium } from "@/components/common/Buttons/ButtonIcon";
import CartItemCard from "@/components/common/cards/CartItemCard";
import { CartItem, getCartItems } from "@/apis/cart";
import { useRecoilState } from "recoil";
import { cartState } from "@/recoil/atoms/cartState";
import { DELIVERY_FEE } from "@/constants";

const getAmountItems = (items: CartItem[]) => items.length;
const getCartTotalPrice = (items: CartItem[]) =>
  items.reduce((totalPrice, currentItem) => totalPrice + currentItem.price, 0);
const getDiscountedTotalPrice = (items: CartItem[]) =>
  items.reduce((discountedTotalPrice, currentItem) => discountedTotalPrice + currentItem.discountedPrice, 0);

const getTotalFee = (items: CartItem[]) => {
  const amount = getDiscountedTotalPrice(items) + DELIVERY_FEE;
  return amount;
};

export default function Page() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [cart, setCart] = useRecoilState(cartState);

  //리뷰 받아오기
  useEffect(() => {
    async function initCart() {
      const cartResponse = await getCartItems();
      const data = cartResponse.data;

      const targetPageInfo = {
        page: data!.pageable.pageNumber,
        totalPages: data!.totalPages,
        totalElements: data!.totalElements,
      };

      const initialCounts: { [key: string]: number } = {};

      data.content.forEach((cartItem) => {
        initialCounts[cartItem.productId] = cartItem.quantity;
      });

      setPageInfo(targetPageInfo);
      setCart({ totalCount: data.totalElements, cartItems: data.content });
    }

    initCart();
  }, [setCart]);

  // 수량 업데이트 함수

  const setCountHandler = (productId: number, value: number) => {
    const cartItem = cart.cartItems;
    const updatedData = cartItem?.map((item) => (item.productId === productId ? { ...item, quantity: value } : item));

    setCart((prev) => ({ ...prev, cartItems: updatedData }));
  };

  if (cart.cartItems.length === 0)
    return (
      <div className="absolute mt-[24px] flex h-auto w-[1280px] items-center justify-center">장바구니가 비어있어요</div>
    );

  return (
    <div className="absolute mt-[24px] flex h-auto w-[1280px]  gap-2">
      <div className="ml-[41px] mr-2 flex w-[66%] flex-col">
        <p className="mb-4 text-texttitle font-semibold text-primary">장바구니 내역</p>
        <div className="mb-2 grid grid-cols-[1.5fr_3.5fr_1fr_1fr_1fr]  gap-2  px-4 text-center align-middle">
          <div></div>
          <div className="text-[18px] font-bold text-primary">상품설명</div>
          <div className="text-[18px] font-bold text-primary">수량</div>
          <div className="text-[18px] font-bold text-primary">가격</div>
          <div className="text-[18px] font-bold text-primary">취소</div>
        </div>
        {cart.cartItems.map((cartItem) => {
          return (
            <CartItemCard
              key={cartItem.id}
              productId={cartItem.productId}
              cartItem={cartItem}
              count={cartItem.quantity}
              setCountHandler={setCountHandler}
            ></CartItemCard>
          );
        })}
        <div className="mt-[33px] flex justify-end"></div>
        {cart.totalCount !== 0 && pageInfo && (
          <Pagination
            limit={5}
            pageInfo={pageInfo}
            pageSize={4}
            setPageInfo={setPageInfo}
            totalPage={pageInfo?.totalPages}
          />
        )}
      </div>
      <div className="ml-[9px] mt-[82px] flex h-full w-[239px] flex-col rounded-[12px] border border-gray-border p-3">
        <p className="text-base text-gray">상품 총 개수 : {getAmountItems(cart.cartItems).toLocaleString()} 개</p>
        <p className="text-base text-gray line-through">
          총 가격 : {getCartTotalPrice(cart.cartItems).toLocaleString()} 원
        </p>
        <p className="text-base text-gray">
          할인된 금액 : {getDiscountedTotalPrice(cart.cartItems).toLocaleString()} 원
        </p>
        <p className="text-base text-gray">배송비 : {DELIVERY_FEE.toLocaleString()}원</p>
        <div className="my-4 h-[1px] w-[222px] bg-gray-border" />
        <p className="text-xl font-semibold text-primary">
          총 결제금액 : <span className="text-price">{getTotalFee(cart.cartItems).toLocaleString()} 원</span>
        </p>
        <div className="my-4 h-[1px] w-[222px] bg-gray-border" />
        <ButtonMedium type="button">결제하기</ButtonMedium>
      </div>
    </div>
  );
}
