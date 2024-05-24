import Image from "next/image";
import React, { SVGProps } from "react";
import * as Icons from "@/assets/index";
import { ThemeColorDescriptor } from "next/dist/lib/metadata/types/metadata-types";

const themeColor ={
  secondary : "#0A162B",
  white:"#fff"
}

type IconProps = SVGProps<SVGElement> & {
  name: keyof typeof Icons;
  width?: number;
  height?: number;
  color?: keyof typeof themeColor;
  alt: string;
  size?: number;
};
export default function SVGIcon({ name, width = 32, height = 32, size, color = "secondary" , alt, ...props }: IconProps) {
  const Icon = Icons[name];
  const sizeProps = { width, height };
  return (
    <div className="h-full flex justify-center items-center">
      <Icon {...props} color={themeColor[color]} alt={alt} {...sizeProps}></Icon>
    </div>
  );
}
