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

//Q: layout 하고 pages를 어떻게 구분할까 ..? children한테는 인자를 줄 수 없으니 ...

export default function layout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <div className="mt-8 flex flex-row justify-between  gap-8">
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
          <div className="mb-8 flex w-full cursor-pointer flex-col items-end border-b border-b-gray-border pb-3 text-[14px] text-text ">
            <ul className="bg-gray-100 flex ">
              {FILTERS.map((item, index) => (
                <li
                  key={index}
                  className="mr-2 cursor-pointer border-r border-gray-border pr-2 font-bold text-text last:border-r-0 last:pr-0 hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
