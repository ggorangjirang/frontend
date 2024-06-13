import SVGIcon, { IconProps } from "../icon/SVGIcon";
import { ReactNode } from "react";
import Image from "next/image";

interface Props extends IconProps {
  children: ReactNode;
  bgColor: string;
  onClickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface MediumButtonProps {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  bgColor?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonProps {
  className?: string;
  value: string;
  type: "submit" | "reset" | "button";
  size: keyof SizeVariants;
}
interface SizeVariants {
  mypage: string;
  users: string;
  review: string;
  edit: string;
}

interface KakaoProps {
  onClickHandler: () => void;
}
export default function ButtonIcon({
  children,
  name,
  size,
  color: iconColor,
  bgColor = "#6e6e69",
  onClickHandler,
}: Props) {
  return (
    <div
      className={
        `justify-cente flex h-16 w-[340px] cursor-pointer items-center justify-center gap-8 rounded-lg text-background-white ` +
        bgColor
      }
      style={{ backgroundColor: bgColor }}
      onClick={onClickHandler}
    >
      <SVGIcon name={name} size={size} color={iconColor}></SVGIcon>
      <div className="text-[20px] font-bold">{children}</div>
    </div>
  );
}

export const ButtonPrimary: React.FC<ButtonProps> = ({ value, className, type, size }) => {
  const sizeVariants = {
    review: "w-[170px] h-[38px]",
    edit: "w-[79px] h-[38px]",
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

export const ButtonMedium = ({ type, children, bgColor = "bg-primary", onClickHandler }: MediumButtonProps) => {
  return (
    <button
      type={type}
      className={`h-auto w-auto cursor-pointer rounded-[12px] ${bgColor} px-3 py-1 text-center text-base text-white hover:opacity-80`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};
export const KakaoButton = ({ onClickHandler }: KakaoProps) => {
  return (
    <button
      className="mb-[12px] flex h-[46px] w-[327px] items-center justify-center rounded-[12px] bg-[#FFEB00] text-[16px] font-medium text-[#3C1E1E]"
      onClick={onClickHandler}
    >
      <Image src="/kakao.png" alt="" width={16} height={16} />
      <span className="ml-[8px]">카카오 로그인</span>
    </button>
  );
};
