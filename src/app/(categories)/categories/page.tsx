"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Categories, getSubCategories } from "@/apis/categories";
import { Product, getMainProductList, getSubProductList } from "@/apis/product";
import ProductCardList from "@/components/common/cards/ProductCardList";
import SideBar from "@/components/products/CategorySideBar";
import { FILTERS } from "@/constants/filterConfig";
import Pagination, { PageInfo } from "@/layout/Pagenation/Pagination";

export default function Page() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") ?? "";
  const subCategoryId = searchParams.get("subCategoryId") ?? 0;

  const [productList, setProductList] = useState<Product[]>();
  const [sideBarList, setSideBarList] = useState<Categories>();
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    const initProduct = async () => {
      let data;
      const targetPage = pageInfo?.page ?? 0;

      if (subCategoryId === 0) {
        data = await getMainProductList(categoryId, targetPage);
      }

      if (subCategoryId !== 0) data = await getSubProductList(subCategoryId, targetPage);

      const targetPageInfo = {
        page: data!.pageable.pageNumber,
        totalPages: data!.totalPages,
        totalElements: data!.totalElements,
      };
      setPageInfo(targetPageInfo);
      setProductList(data?.content);
    };

    initProduct();
  }, [categoryId, pageInfo?.page, subCategoryId]);

  useEffect(() => {
    const initNavData = async () => {
      let data = await getSubCategories();
      const currentCategory = data.filter((item) => item.main[0].categoryId === Number(categoryId))[0];
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
          {pageInfo !== null && (
            <Pagination
              pageSize={16}
              totalPage={pageInfo.totalPages}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
              limit={5}
            />
          )}
        </div>
      </>
    )
  );
}
