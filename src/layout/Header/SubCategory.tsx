import React from "react";

type Props = {
    subCategory:string[];
};

export const SubCategory = ({subCategory}:Props) => {
  return (
    <div className="dropdown-menu text-black absolute top-full hidden h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
      <ul className="top-0 block w-full rounded-b-md bg-white shadow">
        {subCategory.map((item)=>{
            return (
                <li className=" flex  h-[40px] w-[250px] cursor-pointer items-center justify-center hover:text-primary" key={item}>
                {item}
              </li>
            )
        })}
      
      </ul>
    </div>
  );
};
