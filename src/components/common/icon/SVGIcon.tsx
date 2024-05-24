import Image from "next/image";
import React, { SVGProps } from "react";
import * as Icons from "@/assets/index";
type IconProps =SVGProps<SVGElement> & {
  name: keyof typeof Icons
  width?: number;
  height?: number;
  color?: string;
  alt: string;
};

export default function SVGIcon({ name, width = 32, height = 32, color = "#0a162b", alt,...props }: IconProps) {
  const Icon = Icons[name];
 
  return (
    <div>
      <Icon width={width} height={height} color={color} alt={alt} {...props} ></Icon>
    </div>
  );
}
