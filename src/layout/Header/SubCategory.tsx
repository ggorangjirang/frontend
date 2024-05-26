import React from "react";
import { SubCategories } from ".";
import Link from "next/link";

type Props = {
  subCategory: SubCategories[];
};

export const SubCategory = ({ subCategory }: Props) => {
  return (
    <div className="dropdown-menu absolute top-full z-50 hidden h-full text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
      <ul className="top-0 block w-full rounded-b-md bg-white shadow" >
        {subCategory.map((item) => {
          return (
            <Link href={`/categories?${item.code}`} key={"link"+item.code}>
              <li
                className="z-1000 flex  h-[40px] w-[250px] cursor-pointer items-center justify-center hover:text-primary"
                key={item.code}
              >
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
