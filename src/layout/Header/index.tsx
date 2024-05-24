import SVGIcon from "@/components/common/icon/SVGIcon";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <nav className="flex h-[160px] w-screen flex-col items-center">
      <div className="flex h-[120px] items-center justify-center gap-20 py-5">
        <Image src={"/logo2.png"} width={203} height={80} alt="logo"></Image>
        <div className="flex">
          <input className="h-9 w-[400px] rounded-l-md border-2 border-secondary px-2 focus:outline-none"></input>
          <div className="flex h-9 w-[60px] cursor-pointer items-center justify-center rounded-r-md bg-secondary hover:opacity-80">
            <SVGIcon name="Search" width={32} height={32} color={"white"} alt="search_icon"></SVGIcon>
          </div>
        </div>
        <div className="flex w-full justify-center gap-6 rounded">
          <div className="flex items-center justify-center gap-1 ">
            <SVGIcon name="Basket" alt="basket_icon" width={24} height={24} color="secondary"></SVGIcon>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="text-sm flex h-4 w-5 items-center justify-center rounded bg-secondary text-white">0</div>
              <span className="w-full text-[12px] text-text hover:text-primary">장바구니</span>
            </div>
          </div>
          <div className="border border-l-0 border-r"></div>
          <div className="flex items-center justify-center gap-1 ">
            <SVGIcon name="User" alt="basket_icon" width={24} height={24}></SVGIcon>
            <div className="flex w-full flex-col items-center justify-center">
              <span className="w-full text-[12px] text-text hover:text-primary">로그인</span>
            </div>
          </div>
          <div className="border border-l-0 border-r"></div>
          <div className="flex items-center justify-center gap-1 ">
            <SVGIcon name="Signup" alt="basket_icon" width={24} height={24}></SVGIcon>
            <div className="flex w-full flex-col items-center justify-center">
              <span className="w-full text-[12px] text-text hover:text-primary">회원가입</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center border-y border-gray-border">
        <ul className="items-centertext-white flex h-[40px] w-[1000px]">
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer py-2 text-center font-bold">
            사료
            <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
            <div className="dropdown-menu text-black absolute top-full hidden h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-full rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] w-[250px] items-center justify-center hover:text-primary cursor-pointer">
                  강아지 사료
                </li>
                <li className=" flex  h-[40px] items-center justify-center px-16 hover:text-primary cursor-pointer">고양이 사료</li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            간식
            <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
            <div className="dropdown-menu text-black absolute top-full hidden h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-[250px]  rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary cursor-pointer">강아지 간식</li>
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary cursor-pointer">고양이 간식</li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            배변/위생
            <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
            <div className="dropdown-menu radi text-black absolute top-full hidden  h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-[250px] rounded-b-md bg-white shadow ">
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary cursor-pointer">배변패드</li>
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary cursor-pointer">고양이모래 </li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            패션
            <div className=" absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-transparent border-b-primary group-hover:block" />
            <div className="dropdown-menu text-black absolute top-full hidden h-full group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-[250px] rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary ">의류</li>
                <li className=" flex  h-[40px] items-center justify-center hover:text-primary">넥카라</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
