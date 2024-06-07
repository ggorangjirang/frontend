"use client";
import { useState } from "react";
import OrderDetailCard from "@/components/common/cards/OrderDetailCard";
import MyPageTab from "@/components/common/tab";
import Pagination, { PageInfo } from "@/layout/Pagenation/Pagination";

export default function Page() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  return (
    <>
      <div className="absolute mt-[24px] flex h-auto w-[1280px]">
        <MyPageTab />
        {/* size 헤더에 맞출지 고민하기 */}
        <div className="ml-[41px] w-[73%] ">
          <p className="mb-[26px] text-texttitle font-semibold text-primary">주문/배송</p>
          <OrderDetailCard />
          <OrderDetailCard />
          <OrderDetailCard />
          <OrderDetailCard />
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
      </div>
    </>
  );
}
