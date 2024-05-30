"use client";
import React from "react";
import Image from "next/image";

interface ButtonProps {
  className?: string;
  value: string;
  type: "submit" | "reset" | "button";
  size: keyof SizeVariants;
}
interface SizeVariants {
  mypage: string;
  users: string;
}
export const Button: React.FC<ButtonProps> = ({ value, className, type, size }) => {
  const sizeVariants = {
    mypage: "w-[188px] h-[38px]",
    users: "w-[327px] h-[46px]",
  };
  return (
    <button
      type={type}
      className={`${sizeVariants[size]} mb-[12px] cursor-pointer rounded-[12px] border bg-primary text-center text-texttitle font-semibold ${className}`}
    >
      <p>{value}</p>
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
