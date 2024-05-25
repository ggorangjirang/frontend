import ProductCardList from "@/components/common/cards/ProductCardList";
import { DefaultLayoutProps } from "@/components/common/type/LayoutType";
import { FILTERS } from "@/constants/Filters";
import React from "react";

//데이터 받아오면 쿼리스트링으로 데이터 요청한 후 받아온다
//1. 카테고리 받아와서 표시
//2. 내용 불러와서 표시

const categories = {
  main: "전체",
  subCategories: ["강아지 사료", "고양이 사료"],
};


export default function layout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <div className="mt-8 flex flex-row justify-between ">
        <div className="flex h-full w-[180px] cursor-pointer flex-col items-center justify-center border-b border-b-gray-border py-1 align-middle text-sm text-text">
          <div className="flex w-full items-center justify-center border-b border-b-gray-border  py-1  text-[14px]">
            사료
          </div>
          <ul className="w-full pt-1">
            <li className="flex w-full justify-center py-1 align-middle hover:rounded-md hover:bg-gray-border hover:bg-opacity-50 hover:font-bold">
              {categories.main}
            </li>
            {categories["subCategories"].map((item) => (
              <li
                className="flex w-full justify-center py-1 align-middle hover:rounded-md hover:bg-gray-border hover:bg-opacity-50 hover:font-bold"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-8 flex w-full cursor-pointer flex-col items-end justify-center border-b border-b-gray-border py-1 pb-2 align-middle text-[14px] text-text ">
            <ul className="bg-gray-100 flex">
              {FILTERS.map((item, index) => (
                <li
                  key={index}
                  className="border-gray-border text-text hover:text-primary font-bold mr-2 cursor-pointer border-r pr-2 last:border-r-0 last:pr-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ProductCardList imgSize={200} gapX={14} w={1000}></ProductCardList>
        </div>
      </div>
      {children}
    </div>
  );
}
