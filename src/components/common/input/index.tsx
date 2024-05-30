"use client";
import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  register: any;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className, register, required }) => {
  return (
    <input
      required={required}
      {...register}
      type={type}
      placeholder={placeholder}
      className={`rounded-[12px] border border-gray-border text-textmedium placeholder-gray ${className}`}
    />
  );
};

export default Input;
