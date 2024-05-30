"use client";
import React from "react";
import Image from "next/image";

interface InputProps {
  className?: string;
  value: string;
  height: string;
  width: string;
  type: "submit" | "reset" | "button";
}

export const Button: React.FC<InputProps> = ({ value, className, height, width, type }) => {
  return (
    <button
      type={type}
      className={`h-[${height}px] w-[${width}px] mb-[12px] cursor-pointer rounded-[12px] border bg-primary text-center text-texttitle font-semibold text-white ${className}`}
    >
      <p className={`leading-[${height}px]`}>{value}</p>
    </button>
  );
};

export const KakaoButton = () => {
  return (
    <button className="mb-[12px] flex h-[46px] w-[327px] items-center justify-center rounded-[12px] bg-[#FFEB00] text-[16px] font-medium text-[#3C1E1E]">
      <Image src="/kakao.png" alt={""} width={16} height={16} />
      <span className="ml-[8px]">카카오 로그인</span>
    </button>
  );
};
