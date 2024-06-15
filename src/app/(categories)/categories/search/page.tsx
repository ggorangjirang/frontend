"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Categories, getSubCategories } from "@/apis/categories";
import { Product, getMainProductList, getProductSearch, getSubProductList } from "@/apis/product";
import ProductCardList from "@/components/common/cards/ProductCardList";
import SideBar from "@/components/products/CategorySideBar";
import { FILTERS } from "@/constants/filterConfig";
import Pagination, { PageInfo } from "@/layout/Pagenation/Pagination";
import { searchState } from "@/recoil/atoms/searchState";
import { useRecoilValue } from "recoil";

export default function Page() {
  const searchParams = useSearchParams();
  const search = useRecoilValue(searchState);
  const [productList, setProductList] = useState<Product[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const keyword = searchParams.get("search") ?? "";
  console.log(keyword);
  useEffect(() => {
    const initProduct = async () => {
      const targetPage = pageInfo?.page ?? 0;
      let data = (await getProductSearch(keyword, targetPage)).data;
      console.log(data);
      const targetPageInfo = {
        page: data!.pageable.pageNumber,
        totalPages: data!.totalPages,
        totalElements: data!.totalElements,
      };

      setProductList(data?.content);
      console.log(data);
      setPageInfo(targetPageInfo);
    };

    initProduct();
  }, [keyword, pageInfo?.page]);

  if (!productList) return <div>관련상품이 없습니다.</div>;
  console.log(productList);
  return (
    productList && (
      <>
        <div className=" border-bpy-1 flex h-fit w-[180px] flex-col justify-start text-sm text-text"></div>
        {/* {<SideBar categoryData={sideBarList} selected={Number(subCategoryId)}></SideBar>} */}
        <div>
          <div className="mb-8 flex w-[1000px] cursor-pointer flex-col items-start border-b border-b-gray-border pb-3 text-[14px] text-text ">
            <p>
              <span className="items-align align-middle text-xl font-bold text-primary">{keyword}</span> 에 대한
              검색결과 입니다.
            </p>
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
