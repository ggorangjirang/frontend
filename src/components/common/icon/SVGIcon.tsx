import Image from "next/image";
import React, { SVGProps } from "react";
import * as Icons from "@/assets/index";

const themeColor = {
  secondary: "#0A162B",
  white: "#fff",
};

export type IconProps = SVGProps<SVGElement> & {
  name: keyof typeof Icons;
  width?: number;
  height?: number;
  color?: keyof typeof themeColor;
  size?: number;
};
export default function SVGIcon({ name, width = 32, height = 32, size, color = "secondary", ...props }: IconProps) {
  const Icon = Icons[name];
  const sizeProps = { width: size ? size : width, height: size ? size : height };
  return (
    <div className="flex h-full items-center justify-center">
      <Icon {...props} color={themeColor[color]} {...sizeProps}></Icon>
    </div>
  );
}
