"use client";
import React from "react";

interface InputProps {
  className?: string;
  value: string;
  height: number;
  width: number;
  type: "submit" | "reset" | "button";
}

const Button: React.FC<InputProps> = ({ value, className, height, width, type }) => {
  return (
    <button
      type={type}
      className={`h-[${height}px] w-[${width}px] mb-[12px] cursor-pointer rounded-[12px] border bg-primary text-center text-texttitle font-semibold text-white ${className}`}
    >
      <p className={`leading-[${height}px]`}>{value}</p>
    </button>
  );
};

export default Button;
