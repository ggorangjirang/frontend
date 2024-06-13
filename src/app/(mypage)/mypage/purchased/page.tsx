"use client";
import { useEffect, useState } from "react";
import OrderDetailCard from "@/components/common/cards/OrderDetailCard";
import MyPageTab from "@/components/common/tab";
import Pagination, { PageInfo } from "@/layout/Pagenation/Pagination";
import { getOrder, getOrderPageableResponse } from "@/apis/orders";

export default function Page() {
  const size = 5;
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [orderData, setOrderData] = useState<getOrderPageableResponse | null>(null);
  useEffect(() => {
    const initOrders = async () => {
      const targetPage = pageInfo?.page ?? 0;
      const orderData = await getOrder(targetPage);
      const data = orderData.data;

      const targetPageInfo = {
        page: data!.pageable.pageNumber,
        totalPages: data!.totalPages,
        totalElements: data!.totalElements,
        limit: size,
      };
      setPageInfo(targetPageInfo);
      setOrderData(data);

      console.log(orderData.data);
    };

    initOrders();
  }, [pageInfo?.page]);

  return (
    orderData && (
      <>
        <div className="absolute mt-[24px] flex h-auto w-[1280px]">
          <MyPageTab />
          {/* size 헤더에 맞출지 고민하기 */}
          <div className="ml-[41px] w-[73%] ">
            <p className="mb-[26px] text-texttitle font-semibold text-primary">주문/배송</p>
            {orderData.content.map((order) => (
              <OrderDetailCard key={order.id} order={order} />
            ))}
            {pageInfo && (
              <Pagination
                limit={5}
                pageInfo={pageInfo}
                pageSize={size}
                setPageInfo={setPageInfo}
                totalPage={pageInfo?.totalPages}
              />
            )}
          </div>
        </div>
      </>
    )
  );
}
