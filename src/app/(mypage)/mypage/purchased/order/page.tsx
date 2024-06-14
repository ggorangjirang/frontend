"use client";

import { GetOrderByIdResponse, OrderCancelError, deleteOrderById, getOrderById } from "@/apis/orders";
import { ButtonMedium } from "@/components/common/Buttons/ButtonIcon";
import OrderDetailProductCard from "@/components/common/cards/OrderDetailProductCard";
import TextMedium from "@/components/common/labels/TextMedium";
import MyPageTab from "@/components/common/tab";
import Pagination, { PageInfo } from "@/layout/Pagenation/Pagination";
import { formatDate } from "@/utils/time";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DELIVERY_STATUS, ORDER_STATUS } from "@/constants";
import axios from "axios";

export default function Page() {
  const orderId = useSearchParams().get("orderId");
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [orderInfo, setOrderInfo] = useState<GetOrderByIdResponse>();

  const onClickCancel = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault;
    try {
      const response = await deleteOrderById(Number(orderId));

      setOrderInfo(response.data);
      alert("성공적으로 주문을 취소했습니다.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios 에러일 경우 처리
        if (err.response) {
          const data = err.response.data as OrderCancelError;
          if (data.code.startsWith("EO")) {
            alert(data.msg);
          }
        } else {
          alert(`네트워크 오류 또는 기타 오류: ${err.message}`);
        }
      } else {
        // Axios 에러가 아닌 경우 처리
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    const initOrder = async () => {
      const targetPage = pageInfo?.page ?? 0;
      const data = (await getOrderById(Number(orderId), targetPage)).data;

      const targetPageInfo = {
        page: data!.orderItems.pageable.pageNumber,
        totalPages: data!.orderItems.totalPages,
        totalElements: data!.orderItems.totalElements,
      };

      setPageInfo(targetPageInfo);
      setOrderInfo(data);
    };

    initOrder();
  }, [orderId, pageInfo?.page]);

  return (
    orderInfo && (
      <div className="absolute mt-[24px] flex h-auto w-[1280px]">
        <MyPageTab />
        {/* size 헤더에 맞출지 고민하기 */}
        <div className="ml-[41px] w-[73%] ">
          <p className="mb-[26px] text-texttitle font-semibold text-primary">주문 내역</p>
          <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr] grid-rows-2 justify-center gap-2 border border-gray-border p-5 align-middle">
            <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문일</TextMedium>
            {/* <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>주문번호</TextMedium> */}
            <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제금액</TextMedium>
            {/* <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>결제수단</TextMedium> */}
            <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>배송상태</TextMedium>
            <TextMedium style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
              주문취소여부
            </TextMedium>
            <div className="flex justify-center ">{formatDate(orderInfo.orderDate)}</div>
            {/* <div className="flex justify-center ">1234567891011</div> */}
            <div className="flex justify-center ">{orderInfo.totalAllPrice.toLocaleString()} 원</div>
            {/* <div className="flex justify-center ">무통장입금</div> */}
            <div className="flex justify-center ">{DELIVERY_STATUS[orderInfo.deliveryStatus]}</div>
            <div className="flex justify-center ">{ORDER_STATUS[orderInfo.orderStatus] ?? ""}</div>
          </div>
          {orderInfo.orderItems.content.map((item) => {
            return <OrderDetailProductCard key={item.productName} orderItem={item} />;
          })}
          <div className="mb-11 flex justify-end">
            {orderInfo.orderStatus !== "CANCEL" && (
              <ButtonMedium type="button" bgColor="bg-warning" onClickHandler={onClickCancel}>
                주문 취소
              </ButtonMedium>
            )}
          </div>
          {pageInfo && (
            <Pagination
              limit={5}
              pageInfo={pageInfo}
              pageSize={5}
              setPageInfo={setPageInfo}
              totalPage={pageInfo?.totalPages}
            />
          )}
        </div>
      </div>
    )
  );
}
