"use client";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  register: any;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className, register }) => {
  return (
    <input
      required
      {...register}
      type={type}
      placeholder={placeholder}
      className={`mb-[12px] h-[46px] w-[327px] rounded-[12px] border border-gray-border pl-[24px] text-textmedium placeholder-gray ${className}`}
    />
  );
};

export default Input;
