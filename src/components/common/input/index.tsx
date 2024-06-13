"use client";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  register: any;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  multiple?: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className, register, required, value, defaultValue }) => {
  return (
    <input
      defaultValue={defaultValue}
      required={required}
      {...register}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`rounded-[12px] border border-gray-border text-textmedium placeholder-gray ${className}`}
    />
  );
};

export const TextArea: React.FC<InputProps> = ({
  type,
  placeholder,
  className,
  register,
  required,
  value,
  defaultValue,
}) => {
  return (
    <textarea
      defaultValue={defaultValue}
      required={required}
      {...register}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`rounded-[12px] border border-gray-border text-textmedium placeholder-gray ${className}`}
    />
  );
};

export default Input;
