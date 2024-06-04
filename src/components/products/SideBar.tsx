import { getSubCategories } from "@/apis/categories";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  title: string;
  firstLabelName: string;
  labelNames: string[];
};
export default function SideBar({ title, firstLabelName, labelNames }: Props) {
  return (
    <div className=" flex h-fit w-[180px] flex-col justify-start border-b border-b-gray-border py-1 text-sm text-text">
      <div className="flex w-full items-center justify-center border-b border-b-gray-border  py-1  text-[14px]">
        사료
      </div>
      <ul className="flex h-fit w-full flex-col pt-1">
        <li className="flex h-fit w-full justify-center py-1 align-middle hover:rounded-md hover:bg-gray-border hover:bg-opacity-50 hover:font-bold">
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
  );
}
