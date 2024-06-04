"use client";

import { SubCategoryItem } from "./Header";
import { useRouter } from "next/navigation";

interface Props {
  mainCategoryId: number;
  subCategory: SubCategoryItem[];
}

export const SubCategory = ({ subCategory, mainCategoryId }: Props) => {
  const router = useRouter();
  const onClickMainCategory = ({
    e,
    pathname,
    mainCategoryId,
    subCategoryId,
  }: {
    e: React.MouseEvent<HTMLLIElement, MouseEvent>;
    pathname: string;
    mainCategoryId: number;
    subCategoryId: number;
  }) => {
    e.preventDefault();
    router.push(`${pathname}?categoryId=${mainCategoryId}&subCategoryId=${subCategoryId}`);
  };

  return (
    <div className="dropdown-menu absolute top-full z-50 hidden h-full text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
      <ul className="top-0 block w-full rounded-b-md bg-white shadow">
        {subCategory.map((category) => {
          return (
            <li
              className="z-1000 flex  h-[40px] w-[250px] cursor-pointer items-center justify-center hover:text-primary"
              key={category.subCategoryId}
              onClick={(e) =>
                onClickMainCategory({
                  e: e,
                  pathname: "/categories",
                  mainCategoryId: mainCategoryId,
                  subCategoryId: category.subCategoryId,
                })
              }
            >
              {category.subCategoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
