import React from "react";

type Props = {};

export default function Hearder({}: Props) {
  return (
    <div className="bg-primary flex h-[160px] w-screen flex-col items-center">
      <div className="flex justify-center">
        Header
        <div>img</div>
        <div>searchbar</div>
        <div className="flex justify-center">
          users
          <div>장바구니</div>
          <div>로그인</div>
          <div>회원가입 </div>
        </div>
      </div>
      <div className="w-[1000px]">
        <ul className="bg-secondary h-8 w-full text-white ">
          <li className="group inline-block w-1/4 text-center align-middle font-bold">
            사료
            <div className="absolute hidden group-hover:block bg-white text-black">
              <ul className="">
                <li className="block px-10">강아지 사료</li>
                <li className="block px-10">고양이 사료</li>
              </ul>
            </div>
          </li>
          <li className="group inline-block w-1/4 text-center align-middle font-bold">
            간식
            <ul className="hidden group-hover:inline-block">
              <li>강아지 간식</li>
              <li>고양이 간식</li>
            </ul>
          </li>
          <li className="group inline-block w-1/4 text-center align-middle font-bold">
            배변/위생
            <ul className="hidden group-hover:inline-block ">
              <li>배변패드</li>
              <li>고양이 모래</li>
            </ul>
          </li>
          <li className="group inline-block w-1/4 text-center align-middle font-bold">
            패션
            <ul className="hidden group-hover:inline-block">
              <li>의류</li>
              <li>넥카라</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
