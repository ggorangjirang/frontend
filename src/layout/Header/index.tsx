import Image from "next/image";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="flex h-[160px] w-screen flex-col items-center">
      <div className="flex h-[120px] justify-center py-5">
        Header
        <Image src={"/logo2.png"} width={203} height={80} alt="logo"></Image>
        <input className="h-9 w-[500px] rounded-l-md border-2 border-secondary px-2 focus:outline-none" ></input>
        <div className="flex h-9 w-[60px] justify-center rounded-r-md bg-secondary align-middle cursor-pointer hover:opacity-80">
          <Image width={32} height={32} src={"/search.svg"} alt="search_icon"></Image>
        </div>
        <div className="flex justify-center">
          users
          <div>장바구니</div>
          <div>로그인</div>
          <div>회원가입 </div>
        </div>
      </div>
      <div className="flex w-full justify-center border-y border-gray-border">
        <ul className="items-centertext-white flex h-[40px] w-[1000px]">
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer py-2 text-center font-bold">
            사료
            <div className=" border-transparent absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-b-primary group-hover:block" />
            <div className="dropdown-menu absolute top-full hidden h-full text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-full rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] w-[250px] items-center justify-center hover:text-primary ">
                  강아지 사료
                </li>
                <li className=" flex  h-[40px] items-center justify-center px-16 hover:text-primary">
                  고양이 사료
                </li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            간식
            <div className=" border-transparent absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-b-primary group-hover:block" />
            <div className="dropdown-menu absolute top-full hidden h-full text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-full rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] w-[250px] items-center justify-center hover:text-primary ">
                  강아지 간식
                </li>
                <li className=" flex  h-[40px] items-center justify-center px-16 hover:text-primary">
                  고양이 간식
                </li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            배변/위생
            <div className=" border-transparent absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-b-primary group-hover:block" />
            <div className="dropdown-menu radi absolute top-full hidden h-full  text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-full rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] w-[250px] items-center justify-center hover:text-primary ">
                  배변패드
                </li>
                <li className=" flex  h-[40px] items-center justify-center px-16 hover:text-primary">
                  고양이모래{" "}
                </li>
              </ul>
            </div>
          </li>
          <li className="dropdown group relative box-content block w-1/4 cursor-pointer  py-2  text-center font-bold  ">
            패션
            <div className=" border-transparent absolute bottom-0 left-[118px] hidden transform border-8 border-solid border-b-primary group-hover:block" />
            <div className="dropdown-menu absolute top-full hidden h-full text-black group-hover:block group-hover:border-t group-hover:border-t-primary">
              <ul className="top-0 block w-full rounded-b-md bg-white shadow">
                <li className=" flex  h-[40px] w-[250px] items-center justify-center hover:text-primary ">
                  의류
                </li>
                <li className=" flex  h-[40px] items-center justify-center px-16 hover:text-primary">
                  넥카라
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
