import React from "react";
import { DefaultLayoutProps } from "../common/type/LayoutType";

export default function LabelPrice({ children }: DefaultLayoutProps) {
  return <div className="text-[18px] font-bold text-price">{children}</div>;
}
