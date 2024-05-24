import React from "react";

type Props = {
    item:string[];
};

const SubCategory = (props: Props) => {
  return (
    <div className="dropdown-menu text-black absolute top-full hidden h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
      <ul className="top-0 block w-full rounded-b-md bg-white shadow">
        <li className=" flex  h-[40px] w-[250px] cursor-pointer items-center justify-center hover:text-primary">
          강아지 사료
        </li>
        <li className=" flex  h-[40px] cursor-pointer items-center justify-center px-16 hover:text-primary">
          고양이 사료
        </li>
      </ul>
    </div>
  );
};
