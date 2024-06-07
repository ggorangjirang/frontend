import { Categories } from "@/apis/categories";
import Link from "next/link";

type CategorySideBarProps = {
  categoryData: Categories;
  selected?: number;
};

export default function CategorySideBar({ categoryData, selected = 0 }: CategorySideBarProps) {
  const { main, sub } = categoryData;
  return (
    <div className=" flex h-fit w-[180px] flex-col justify-start border-b border-b-gray-border py-1 text-sm text-text">
      <div className="flex w-full items-center justify-center border-b border-b-gray-border  py-1  text-[14px]">
        {categoryData.main[0].categoryName}
      </div>
      <ul className="flex h-fit w-full flex-col pt-1">
        <Link
          key={main[0].categoryId}
          href={{
            pathname: "/categories",
            query: { categoryId: main[0].categoryId },
          }}
        >
          <li
            className={`flex h-fit w-full justify-center py-1 align-middle hover:rounded-md hover:bg-gray-border hover:bg-opacity-50 hover:font-bold ${selected === 0 ? "bg-gray-border bg-opacity-50" : ""}`}
          >
            전체
          </li>
        </Link>
        {sub.map((item) => (
          <Link
            key={item.subCategoryId}
            href={{
              pathname: "/categories",
              query: { categoryId: main[0].categoryId, subCategoryId: item.subCategoryId },
            }}
          >
            <li
              className={`flex h-fit w-full justify-center py-1 align-middle hover:rounded-md hover:bg-gray-border hover:bg-opacity-50 hover:font-bold ${selected === item.subCategoryId ? "bg-gray-border bg-opacity-50" : ""}`}
              key={item.subCategoryId}
            >
              {item.subCategoryName}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
