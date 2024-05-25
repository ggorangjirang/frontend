"use client";

import SVGIcon from "@/components/common/icon/SVGIcon";
import Image from "next/image";
import React, { useState } from "react";
import { SubCategory } from "./SubCategory";
import { usePathname } from "next/navigation";
import { pageConfig } from "../../../pagesConfig";

type Props = {};

export default function Header({}: Props) {
  const pathName = usePathname();
  const [hover, setHover] = useState<boolean>(false);
  const showHeader = pageConfig[pathName]?.showHeader ?? false;

  function onMouseEnter() {
    setHover(true);
  }

  function onMouseLeave() {
    setHover(false);
  }



  return (
    showHeader && (
      <>
        <div className="relative">
          <nav className="z-50 flex h-[160px] w-screen flex-col items-center">
            <div className="flex h-[120px] items-center justify-center gap-20 py-5">
              <Image src={"/logo2.png"} width={203} height={80} alt="logo"></Image>
              <div className="flex">
                <input className="h-9 w-[400px] rounded-l-md border-2 border-secondary px-2 focus:outline-none"></input>
                <div className="flex h-9 w-[60px] cursor-pointer items-center justify-center rounded-r-md bg-secondary hover:opacity-80">
                  <SVGIcon name="Search" width={32} height={32} color={"white"}></SVGIcon>
                </div>
              </div>
              <div className="flex w-full justify-center gap-6 rounded">
                <div className="flex items-center justify-center gap-1 ">
                  <SVGIcon name="Basket" width={24} height={24} color="secondary"></SVGIcon>
                  <div className="flex w-full cursor-pointer flex-col items-center justify-center">
                    <div className="flex h-full w-5 cursor-pointer  items-center justify-center rounded bg-secondary text-[12px] text-white">
                      0
                    </div>
                    <span className="w-full cursor-pointer text-[12px] text-text hover:text-primary">장바구니</span>
                  </div>
                </div>
                <div className="border border-l-0 border-r"></div>
                <div className="flex cursor-pointer items-center justify-center  gap-1">
                  <SVGIcon name="User" width={24} height={24}></SVGIcon>
                  <div className="flex w-full flex-col items-center justify-center">
                    <span className="w-full text-[12px] text-text hover:text-primary">로그인</span>
                  </div>
                </div>
                <div className="border border-l-0 border-r"></div>
                <div className="flex cursor-pointer items-center justify-center gap-1">
                  <SVGIcon name="Signup" width={24} height={24}></SVGIcon>
                  <div className="flex w-full flex-col items-center justify-center">
                    <span className="w-full text-[12px] text-text hover:text-primary">회원가입</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center border-y border-gray-border">
              <ul
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="items-centertext-white flex h-[40px] w-[1000px]"
              >
                <li className="dropdown group relative box-content block w-1/4 cursor-pointer py-2 text-center font-bold">
                  사료
                  <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
                  <SubCategory subCategory={["강아지 사료", "고양이 사료"]} />
                </li>
                <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
                  간식
                  <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
                  <SubCategory subCategory={["강아지 간식", "강아지 간식"]} />
                </li>
                <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
                  배변/위생
                  <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
                  <SubCategory subCategory={["배변패드", "고양이 모래"]} />
                </li>
                <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
                  패션
                  <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
                  <SubCategory subCategory={["의류", "넥카라"]} />
                </li>
              </ul>
            </div>
          </nav>
          <div
            className={`absolute top-full z-30 flex h-[3500px] w-full  transition-opacity delay-150 duration-300 ease-in-out ${hover ? "bg-black  opacity-75" : " invisible  bg-black opacity-0 "} `}
            style={{ transitionProperty: "opacity, visibility" }}
          ></div>
        </div>
      </>
    )
  );
}
