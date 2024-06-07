"use client";

import { useState } from "react";
import Pagination from "@/layout/Pagenation/Pagination";
import { PageInfo } from "@/layout/Pagenation/Pagination";
import { ButtonMedium } from "@/components/common/Buttons/ButtonIcon";
import BasketItemCard from "@/components/common/cards/BasketItemCard";

export default function Page() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [count, setCount] = useState(1);

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
        <BasketItemCard count={count} setCount={setCount}></BasketItemCard>
        <div className="mt-[33px] flex justify-end"></div>
        {pageInfo && (
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
        <p className="text-base text-gray">상품 총 개수 : 2개</p>
        <p className="text-base text-gray">총 가격 : 12,000 원</p>
        <p className="text-base text-gray">할인받은 금액 : 7,200원</p>
        <p className="text-base text-gray">배송비 : 3,000원</p>
        <div className="my-4 h-[1px] w-[222px] bg-gray-border" />
        <p className="text-xl font-semibold text-primary">
          총 결제금액 : <span className="text-price">15,000 원</span>
        </p>
        <div className="my-4 h-[1px] w-[222px] bg-gray-border" />
        <ButtonMedium type="button">결제하기</ButtonMedium>
      </div>
    </div>
  );
}
