"use client";

import SVGIcon from "@/components/common/icon/SVGIcon";
import Image from "next/image";
import React, { useState } from "react";
import { SubCategory } from "./SubCategory";
import { usePathname } from "next/navigation";
import { pageConfig } from "../../../pagesConfig";
import Link from "next/link";

type Props = {};

export type SubCategories = {
  name: string;
  code: number;
};

type DummyCategories = {
  main: string;
  sub: SubCategories[];
};
const DUMMYCATEGORIES: Record<string, DummyCategories> = {
  food: {
    main: "사료",
    sub: [
      { name: "강아지 사료", code: 1 },
      { name: "고양이 사료", code: 2 },
    ],
  },
  snack: {
    main: "간식",
    sub: [
      { name: "강아지 간식", code: 3 },
      { name: "고양이 간식", code: 4 },
    ],
  },
  cleaner: {
    main: "배변/위생",
    sub: [
      { name: "배변패드", code: 5 },
      { name: "고양이 모래", code: 6 },
    ],
  },
  fashion: {
    main: "패션",
    sub: [
      { name: "의류", code: 7 },
      { name: "넥카라", code: 8 },
    ],
  },
};

export default function Header({}: Props) {
  const pathName = usePathname();
  const showHeader = pageConfig[pathName]?.showHeader ?? false;
  const [hover, setHover] = useState<boolean>();

  function onMouseEnter() {
    setHover(true);
  }

  function onMouseLeave() {
    setHover(false);
  }

  return (
    showHeader && (
      <>
        <nav className="z-50 flex h-[160px] w-screen flex-col items-center">
          <div className="flex h-[120px] items-center justify-center gap-20 py-5">
            <Link href={"/"} className="w-full h-full"><Image src={"/logo2.png"} width={203} height={80} alt="logo"></Image></Link>
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
              {Object.keys(DUMMYCATEGORIES).map((key, index) => {
                return (
                  <li
                    key={key + index}
                    className="dropdown group relative box-content block w-1/4 cursor-pointer py-2 text-center font-bold"
                  >
                    <div
                      key={`arrow${index}`}
                      className=" absolute bottom-0 left-[118px] z-50 hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block"
                    />
                    {DUMMYCATEGORIES[key].main}
                    <SubCategory key={key} subCategory={DUMMYCATEGORIES[key].sub} />
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div
          className={`absolute top-[160px] z-30 h-dvh w-full  transition-opacity delay-150 duration-300 ease-in-out ${hover ? "bg-black  opacity-75" : " invisible  bg-black opacity-0 "} `}
          style={{ transitionProperty: "opacity, visibility" }}
        ></div>
      </>
    )
  );
}
