"use client";
import { ButtonMedium } from "@/components/common/Buttons/ButtonIcon";
import OrderDetailProductCard from "@/components/common/cards/OrderDetailProductCard";
import TextMedium from "@/components/common/labels/TextMedium";
import MyPageTab from "@/components/common/tab";
import Pagination from "@/layout/Pagenation/Pagination";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="absolute mt-[24px] flex h-auto w-[1280px]">
      {/* size 헤더에 맞출지 고민하기 */}
      <div className="ml-[41px] w-[73%] ">
        <p className="mb-[26px] text-texttitle font-semibold text-primary">주문 내역</p>
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] grid-rows-2 justify-center gap-2 border border-gray-border p-5 align-middle">
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문일</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문번호</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제금액</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제수단</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>배송상태</TextMedium>
          <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
            주문취소여부
          </TextMedium>
          <div className="flex justify-center ">2024.01.01</div>
          <div className="flex justify-center ">1234567891011</div>
          <div className="flex justify-center ">9999990 원</div>
          <div className="flex justify-center ">무통장입금</div>
          <div className="flex justify-center ">배송 전</div>
          <div className="flex justify-center ">x</div>
        </div>
        <OrderDetailProductCard />
        <OrderDetailProductCard />
        <OrderDetailProductCard />
        <OrderDetailProductCard />
        <div className="flex justify-end">
          <ButtonMedium type="button" bgColor="bg-warning">
            주문 취소
          </ButtonMedium>
        </div>
        {/* {pageInfo && (
          <Pagination
            limit={5}
            pageInfo={pageInfo}
            pageSize={4}
            setPageInfo={setPageInfo}
            totalPage={pageInfo?.totalPages}
          />
        )} */}
      </div>
      <MyPageTab />
    </div>
  );
}
