import React from "react";
import { DefaultLayoutProps } from "../type/LayoutType";
import SVGIcon, { IconProps } from "../icon/SVGIcon";

type Props = DefaultLayoutProps & IconProps & { bgColor: string };

export default function ButtonIcon({ children, name, size, color: iconColor, bgColor = "#6e6e69" }: Props) {
  return (
    <div className={`flex h-16 w-[340px] justify-center items-center justify-cente gap-8 text-background-white rounded-lg `+bgColor} style={{ backgroundColor: bgColor }}>
      <SVGIcon name={name} size={size} color={iconColor}></SVGIcon>
      <div className="text-[20px] font-bold">{children}</div>
    </div>
  );
}
