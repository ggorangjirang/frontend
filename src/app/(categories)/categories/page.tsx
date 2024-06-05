"use client";

import { Categories, getSubCategories } from "@/apis/categories";
import { Pagable, Product, getMainProductList, getSubProductList } from "@/apis/product";
import ProductCardList from "@/components/common/cards/ProductCardList";
import SideBar from "@/components/products/CategorySideBar";
import { FILTERS } from "@/constants/filterConfig";
import Pagenation from "@/layout/Pagenation/Pagenation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type PageInfo = {
  page: number;
  totalPages: number;
  totalElements: number;
};

export default function Page() {
  const searchParams = useSearchParams();
  const [productList, setProductList] = useState<Product[]>();
  const [sideBarList, setSideBarList] = useState<Categories>();
  const categoryId = searchParams.get("categoryId") ?? "";
  const subCategoryId = searchParams.get("subCategoryId") ?? 0;
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, totalPages: 5, totalElements: 80 });

  useEffect(() => {
    const initProduct = async () => {
      let data;
      if (subCategoryId === 0) {
        data = await getMainProductList(categoryId, pageInfo.page - 1);
      }
      if (subCategoryId !== 0) data = await getSubProductList(subCategoryId, pageInfo.page - 1);

      setProductList(data?.content);
      setPageInfo({ ...pageInfo, totalPages: data?.totalPages!, totalElements: data?.totalElements! });
    };

    initProduct();
  }, [categoryId, pageInfo.page, subCategoryId]);

  useEffect(() => {
    const initNavData = async () => {
      let data = await getSubCategories();
      const currentCategory = data.filter((item) => item.main[0].categoryId === Number(categoryId))[0];
      setPageInfo((prev) => ({ ...prev, page: 1 }));
      setSideBarList(currentCategory);
    };

    initNavData();
  }, [categoryId, subCategoryId]);

  return (
    productList &&
    sideBarList && (
      <>
        {<SideBar categoryData={sideBarList} selected={Number(subCategoryId)}></SideBar>}
        <div>
          <div className="mb-8 flex w-[1000px] cursor-pointer flex-col items-end border-b border-b-gray-border pb-3 text-[14px] text-text ">
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
          <ProductCardList productList={productList} imgSize={200} gapX={56} w={1000}></ProductCardList>
          <Pagenation
            pageSize={16}
            totalPage={pageInfo.totalPages}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            limit={5}
            requestFn={() => {}}
          ></Pagenation>
        </div>
      </>
    )
  );
}
